export class AccessError extends Error {
  constructor(message = "AccessError") {
    super(message);
  }
}

export class AuthorizationError extends Error {
  constructor(message = "AuthorizationError") {
    super(message);
  }
}
