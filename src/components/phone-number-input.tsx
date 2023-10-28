import React, { useEffect, useRef, useState } from 'react';

import { Input } from './ui/input';

const PhoneNumberInput = (props: any) => {
  const formField = props?.formField;
  const countryPrefix = '+998';
  const [phoneNumber, setPhoneNumber] = useState(countryPrefix);

  const handlePhoneNumberInput = (e: KeyboardEvent) => {
    const input = e.target.value;
    const typingData = e.nativeEvent.data;

    if (/^[0-9]*$/.test(typingData) || typingData === null) {
      setPhoneNumber(countryPrefix + input.substr(countryPrefix.length));
    }
    formField.onChange(e);
  };

  return (
    <Input
      id="phonenumber"
      type="text"
      {...formField}
      onChange={handlePhoneNumberInput}
      value={phoneNumber}
    />
  );
};

export default PhoneNumberInput;
