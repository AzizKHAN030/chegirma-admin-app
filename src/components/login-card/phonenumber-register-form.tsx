'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-intl/client';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useCustomerVerificationStore } from '@/store/customer-verification';

import PhoneNumberInput from '../phone-number-input';

const PhoneNumberRegisterForm = () => {
  const t = useTranslations('Index');
  const router = useRouter();
  const setVerificationSent = useCustomerVerificationStore(
    state => state.setIsVerificationCodeSent
  );

  const formSchema = z.object({
    phonenumber: z.string().min(13).max(13, 'Invalid phone number'),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onRegister = async (values: z.infer<typeof formSchema>) => {
    const { phonenumber } = values;
    Cookies.set('verify_phonenumber', phonenumber);
    setVerificationSent(true);

    router.push('/auth/verify');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onRegister)}>
        <FormField
          control={form.control}
          name="phonenumber"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>{t('Phone number')}</FormLabel>
              <FormControl>
                <PhoneNumberInput formField={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{t('Create an account')}</Button>
      </form>
    </Form>
  );
};

export default PhoneNumberRegisterForm;
