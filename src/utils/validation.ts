import * as yup from 'yup';

import { SignInFormData, SignUpFormData } from '@/types';

const emailSchema = yup
  .string()
  .required('email.required')
  .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'email.invalid')
  .email('email.invalid');

const passwordSchema = yup
  .string()
  .required('password.required')
  .min(8, 'password.length')
  .matches(/[a-zA-Z]/, 'password.letter')
  .matches(/\d/, 'password.digit')
  .matches(/[\p{P}\p{S}]/u, 'password.special_char');

export const signInSchema: yup.ObjectSchema<SignInFormData> = yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema: yup.ObjectSchema<SignUpFormData> = yup.object().shape({
  username: yup.string().required('username.required'),

  email: emailSchema,
  password: passwordSchema,

  confirmPassword: yup
    .string()
    .required('confirm_pwd.required')
    .oneOf([yup.ref('password')], 'confirm_pwd.match'),
});
