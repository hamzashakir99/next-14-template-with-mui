export class CustomError extends Error {
  public status: number;
  public data: any;
  constructor(message: string, status: number, data: any) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}
