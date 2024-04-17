import { injectable } from 'inversify';
import { type EnqueueSnackbar, type SnackbarKey } from 'notistack';

@injectable()
export class ToastAgent {
  private enqueueSnackbar: EnqueueSnackbar | undefined;

  init(enqueueSnackbar: EnqueueSnackbar): void {
    this.enqueueSnackbar = enqueueSnackbar;
  }

  show(...args: Parameters<EnqueueSnackbar>): SnackbarKey | undefined {
    return this.enqueueSnackbar?.(...args);
  }
}
