export class SigInException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SignInException';
  }
}
