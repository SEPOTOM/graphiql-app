import * as yup from 'yup';

import { SignInFormData } from '@/components/SignInForm/types';
import { SignUpFormData } from '@/components/SignUpForm/types';

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

export const signUpSchema: yup.ObjectSchema<SignUpFormData> = yup.object().shape({
  username: yup.string().required('Username is required'),

  email: yup.string().required('Email is required').email('Invalid email address'),

  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .matches(/\d/, 'Password must contain at least one digit')
    .matches(/[\p{P}\p{S}]/u, 'Password must contain at least one special character'),

  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});
