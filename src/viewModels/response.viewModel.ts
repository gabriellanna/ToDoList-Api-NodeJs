export class ResponseViewModel<T> {
  success: boolean;
  data: T | null;
  message: string;

  constructor(success: boolean, data: T | null, message: string) {
    this.success = success;
    this.data = data;
    this.message = message;
  }
}
