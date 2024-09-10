import * as yup from 'yup';

import { SignUpFormData } from '@/components/SignUpForm/types';
import { SignInFormData } from '@/types';

const emailSchema = yup.string().required('Email is required').email('Invalid email address');

const passwordSchema = yup
  .string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
  .matches(/\d/, 'Password must contain at least one digit')
  .matches(/[\p{P}\p{S}]/u, 'Password must contain at least one special character');

export const signInSchema: yup.ObjectSchema<SignInFormData> = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema: yup.ObjectSchema<SignUpFormData> = yup.object().shape({
  username: yup.string().required('Username is required'),

  email: emailSchema,
  password: passwordSchema,

  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});
