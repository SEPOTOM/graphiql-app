export const getAuthErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    case 'auth/invalid-credential': {
      return 'The credential provided is invalid.';
    }
    default: {
      return 'An unexpected error occurred. Please try again.';
    }
  }
};

export const getServerAuthErrorData = (errorCode: string) => {
  const errorMessage = getAuthErrorMessage(errorCode);

  switch (errorCode) {
    default: {
      return {
        errorMessage: 'Failed to sign up.',
        status: 500,
      };
    }
  }
};

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}
