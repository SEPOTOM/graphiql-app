import * as yup from 'yup';

import { SignInFormData } from '@/components/SignInForm/types';

export const signInSchema: yup.ObjectSchema<SignInFormData> = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email address'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .matches(/\d/, 'Password must contain at least one digit')
    .matches(/[\p{P}\p{S}]/u, 'Password must contain at least one special character'),
});
