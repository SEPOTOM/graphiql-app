'use client';

import { ForwardedRef, forwardRef, useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';

import { PasswordFieldProps } from './types';

const PasswordField = forwardRef(function PasswordField(
  props: PasswordFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      {...props}
      ref={ref}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <InputAdornment position="end" sx={{ mr: 1 }}>
            <IconButton
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={handleClickTogglePassword}
              edge="end"
              disabled={props.disabled}
            >
              {showPassword ?
                <VisibilityOffIcon />
              : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
});

export default PasswordField;
