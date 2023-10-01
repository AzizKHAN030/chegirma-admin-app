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

const RegisterForm = () => {
  const t = useTranslations('Index');

  const registerFormSchema = z
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
  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
  });

  const onRegister = async (values: z.infer<typeof registerFormSchema>) => {
    console.log('>>>', values);
  };

  return (
    <Form {...registerForm}>
      <form onSubmit={registerForm.handleSubmit(onRegister)}>
        <FormField
          control={registerForm.control}
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
          control={registerForm.control}
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
          control={registerForm.control}
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

export default RegisterForm;
