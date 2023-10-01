import React, { useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

import { Input } from './ui/input';

const PasswordInput = (props: any) => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordShown = () => {
    setPasswordShown(prevState => !prevState);
  };
  const formField = props?.formField;

  return (
    <div className="relative">
      <Input
        id="password"
        {...formField}
        type={passwordShown ? 'text' : 'password'}
      />
      <div
        className="absolute top-[50%] right-3 translate-y-[-50%] cursor-pointer"
        onClick={() => togglePasswordShown()}
      >
        {passwordShown ? <EyeOff /> : <Eye />}
      </div>
    </div>
  );
};

export default PasswordInput;
