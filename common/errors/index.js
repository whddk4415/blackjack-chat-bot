exports.errorCodeEnum = {
  invalid_parameter: InvalidParameter,
  invalid_authentication: InvalidAuthentication,
  invalid_representation: InvalidRepresentation,
  api_not_found: ApiNotFound,
  unauthorized: Unauthorized,
  internal_server_error: InternalServerError,
  too_many_requests: TooManyRequests,
  expired_authentication: ExpiredAuthentication,
  invalid_content_type: InvalidContentType,
  missing_parameter: MissingParameter,
  user_not_found: UserNotFound,
  bad_request: BadRequest,
  conversation_not_found: ConversationNotFound,
  text_too_long: TextTooLong,
  invalid_blocks: InvalidBlocks,
};

export class InvalidParameter extends Error {
  constructor(message) {
    super(message);
    this.name = 'invalid_parameter';
  }
}

export class InvalidAuthentication extends Error {
  constructor(message) {
    super(message);
    this.name = 'invalid_authentication';
  }
}

export class InvalidRepresentation extends Error {
  constructor(message) {
    super(message);
    this.name = 'invalid_representation';
  }
}

export class ApiNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'api_not_found';
  }
}

export class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = 'unauthorized';
  }
}

export class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'internal_server_error';
  }
}

export class TooManyRequests extends Error {
  constructor(message) {
    super(message);
    this.name = 'too_many_requests';
  }
}

export class ExpiredAuthentication extends Error {
  constructor(message) {
    super(message);
    this.name = 'expired_authentication';
  }
}

export class InvalidContentType extends Error {
  constructor(message) {
    super(message);
    this.name = 'invalid_content_type';
  }
}

export class MissingParameter extends Error {
  constructor(message) {
    super(message);
    this.name = 'missing_parameter';
  }
}

export class UserNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'user_not_found';
  }
}

export class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.name = 'bad_request';
  }
}

export class ConversationNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'conversation_not_found';
  }
}

export class TextTooLong extends Error {
  constructor(message) {
    super(message);
    this.name = 'text_too_long';
  }
}

export class InvalidBlocks extends Error {
  constructor(message) {
    super(message);
    this.name = 'invalid_blocks';
  }
}
