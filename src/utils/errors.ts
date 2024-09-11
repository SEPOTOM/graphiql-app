export const getAuthErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    case 'auth/invalid-credential': {
      return 'The credential provided is invalid.';
    }
    case 'auth/email-already-exists': {
      return 'Email is already in use.';
    }
    default: {
      return 'An unexpected error occurred. Please try again.';
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
        errorMessage: 'Failed to sign up.',
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
