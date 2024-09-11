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

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}
