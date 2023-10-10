'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
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
import { Input } from '@/components/ui/input';

import PasswordInput from '../password-input';
import PhoneNumberInput from '../phone-number-input';

const PhoneNumberRegisterForm = () => {
  const t = useTranslations('Index');

  const formSchema = z.object({
    phonenumber: z.number().min(13).max(13, 'Invalid phone number'),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onRegister = async (values: z.infer<typeof formSchema>) => {
    console.log('>>>', values);
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
