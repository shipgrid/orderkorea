class HttpError extends Error {
  public statusCode: number;
  public serverMessage: string;
  public clientMessage: string;
  public data?: any;

  constructor(
    statusCode: number,
    serverMessage: string,
    clientMessage?: string,
    data?: any
  ) {
    super(clientMessage || serverMessage);
    this.statusCode = statusCode;
    this.serverMessage = serverMessage;
    this.clientMessage = clientMessage || serverMessage;
    this.data = data;
    this.name = 'HttpError';
    // Maintaining proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }
}

export default HttpError;
