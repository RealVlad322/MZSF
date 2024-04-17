export class HttpException extends Error {
  constructor(
    readonly message: string,
    readonly statusCode: number = 500,
    readonly details: { [key: string]: any } = {},
  ) {
    super(message);
    this.name = 'HttpException';
    Object.setPrototypeOf(this, HttpException.prototype);
  }

  static create(error: string | Error): HttpException {
    return error instanceof HttpException
      ? error
      : new HttpException(
        (error as Error).message || (error as string),
        (error as HttpException).statusCode || 500,
        (error as HttpException).details || (isString(error) ? undefined : error),
      );
  }
}
