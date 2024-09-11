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
