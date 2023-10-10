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

const EmailRegisterForm = () => {
  const t = useTranslations('Index');

  const formSchema = z
    .object({
      email: z.string().email(t('Please enter a valid email address')),
      password: z
        .string()
        .min(6, t('Password must be at least {d} characters long', { d: 6 })),
      confirmPassword: z
        .string({
          required_error: t('Required'),
        })
        .min(6, t('Password must be at least {d} characters long', { d: 6 })),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t('Passwords do not match'),
      path: ['confirmPassword'],
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
          name="email"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>{t('Email')}</FormLabel>
              <FormControl>
                <Input id="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>{t('Password')}</FormLabel>
              <FormControl>
                <PasswordInput formField={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="mb-2">
              <FormLabel>{t('Confirm Password')}</FormLabel>
              <FormControl>
                <PasswordInput formField={field} />
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

export default EmailRegisterForm;
