export class UrlExistsError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

export class ExtensionApiError extends Error {
  constructor(public message: string) {
    super(message);
  }
}
