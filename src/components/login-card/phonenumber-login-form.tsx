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

import PhoneNumberInput from '../phone-number-input';

const PhoneNumberLoginForm = () => {
  const t = useTranslations('Index');

  const formSchema = z.object({
    phonenumber: z.string().min(13).max(13, 'Invalid phone number'),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onLogin = async (values: z.infer<typeof formSchema>) => {
    console.log('>>>', values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onLogin)}>
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
        <Button type="submit">{t('Login')}</Button>
      </form>
    </Form>
  );
};

export default PhoneNumberLoginForm;
