export class SignInException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SignInException';
  }
}
