export const getAuthErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    case 'auth/invalid-credential': {
      return 'auth_errors.invalid_credential';
    }
    case 'auth/email-already-exists': {
      return 'auth_errors.existing_email';
    }
    default: {
      return 'auth_errors.default';
    }
  }
};

export const getServerAuthErrorData = (errorCode: string) => {
  const errorMessage = getAuthErrorMessage(errorCode);
  let status = 500;

  switch (errorCode) {
    case 'auth/email-already-exists': {
      status = 400;
      break;
    }
    default: {
      return {
        errorMessage: 'auth_errors.server_default',
        status: 500,
      };
    }
  }

  return {
    errorMessage,
    status,
  };
};

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}
