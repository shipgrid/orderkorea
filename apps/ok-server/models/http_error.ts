class HttpError {
  /**
   * @param {number} statusCode Http Status Code (e.g. 400, 404, 500)
   * @param {string} serverMessage Internal server error message.
   * @param {string} [clientMessage] (OPTIONAL) - Error message to display to the client. Defaults to serverMessage if empty.
   * @param {any} data Additional data associated with the error (OPTIONAL).
   */
  constructor(
    public statusCode: number,
    public serverMessage: string,
    public clientMessage?: string,
    public data?: any
  ) {}
}

export default HttpError;
