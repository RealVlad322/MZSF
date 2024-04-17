import EventEmitter from 'eventemitter3';
import { injectable } from 'inversify';
import { clearInterval, setInterval } from 'worker-timers';

import { delay } from './delay.function';

export class WsException extends Error {
  constructor(message: string, readonly details?: any) {
    super(message);
  }
}

@injectable()
export class WsAgent {
  static RECONNECTION_DELAY = 5000;
  static PING_INTERVAL = 9000;

  private _pingInterval: any;
  private _socket: WebSocket | null = null;

  events = new EventEmitter();

  listen(url: string): () => void {
    (async () => {
      if (this._socket && this._socket.readyState !== WebSocket.CLOSED) {
        this._socket.close();
        this._emitEvent('close', null);
      }

      try {
        const socket = new WebSocket(url);
        this._socket = socket;

        await new Promise<void>((resolve, reject) => {
          function onOpen(): void {
            resolve();
            socket.removeEventListener('open', onOpen);
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            socket.removeEventListener('error', onError);
          }

          function onError(ev: Event): void {
            reject(new WsException('Connection error', ev));
            socket.removeEventListener('open', onOpen);
            socket.removeEventListener('error', onError);
          }

          socket.addEventListener('open', onOpen);
          socket.addEventListener('error', onError);
        });

        this._emitEvent('open', null);

        const contentIterator = this._createIterator(this._socket);

        for await (const content of contentIterator) {
          const { event, data } = content;
          this._emitEvent(event, data);
        }
      } catch (err: any) {
        console.error(err);

        this._emitEvent('error', { message: err.message });
        this._emitEvent('close', null);

        await delay(WsAgent.RECONNECTION_DELAY);

        this.listen(url);
      }
    })().catch(console.error);

    return () => {
      this._socket?.close();
    };
  }

  pingStart(): void {
    this._pingInterval = setInterval(() => {
      this.emit('ping', {});
    }, WsAgent.PING_INTERVAL);
  }

  pingStop(): void {
    clearInterval(this._pingInterval);
  }

  emit(event: string, data: any): void {
    if (this._socket?.readyState !== WebSocket.OPEN) {
      console.log('Ready State is not open. Skipping...');

      return;
    }

    const message = JSON.stringify({ event, data });
    this._socket.send(message);
    this._emitEvent(event, data);
  }

  close(): void {
    if (this._socket?.readyState === WebSocket.CLOSED) {
      console.log('Already closed');

      return;
    }

    this._socket?.close();
  }

  private _emitEvent(event: string, data: any): void {
    this.events.emit(event, data);
  }

  private _createIterator(socket: WebSocket): AsyncIterableIterator<WsMessage> {
    type EventIteratorReturn = Promise<IteratorResult<WsMessage>>;

    let resolve: ((value: IteratorResult<WsMessage>) => void) | null = null;
    let reject: ((err: any) => void) | null = null;

    function messageListener(event: MessageEvent<string>): void {
      try {
        resolve?.({ done: false, value: JSON.parse(event.data) });
        resolve = null;
      } catch (err: any) {
        reject?.(new WsException('Fail to parse data', err));
      }
    }

    function errorListener(err: Event): void {
      reject?.(new WsException('Connection error', err));
      reject = null;
    }

    socket.addEventListener('message', messageListener);
    socket.addEventListener('error', errorListener);

    return {
      [Symbol.asyncIterator]() {
        return this;
      },
      next(): EventIteratorReturn {
        return new Promise<IteratorResult<WsMessage>>((res, rej) => {
          resolve = res;
          reject = rej;
        });
      },
      return(): EventIteratorReturn {
        socket.removeEventListener('message', messageListener);
        socket.removeEventListener('error', errorListener);

        return Promise.resolve({ done: true, value: { event: 'close', data: null } });
      },
      throw(err: any): EventIteratorReturn {
        socket.removeEventListener('message', messageListener);
        socket.removeEventListener('error', errorListener);

        return Promise.reject(new WsException('Unknown error', err));
      },
    };
  }
}

export interface WsMessage {
  event: string;
  data: any;
}
