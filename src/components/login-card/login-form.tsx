'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-intl/client';
import * as z from 'zod';

import PasswordInput from '@/components/password-input';
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

const LoginForm = () => {
  const t = useTranslations('Index');
  const router = useRouter();

  const loginFormSchema = z.object({
    email: z.string().email(t('Please enter a valid email address')),
    password: z
      .string()
      .min(6, t('Password must be at least {d} characters long', { d: 6 })),
  });

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  const onLogin = async (values: z.infer<typeof loginFormSchema>) => {
    console.log('>>>', values);

    const res = await signIn('credentials', {
      number: '+998903590066',
      password: 'asdasd',
      redirect: false,
    });
    if (res?.ok) {
      router.refresh();
    }
  };

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onLogin)}>
        <FormField
          control={loginForm.control}
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
          control={loginForm.control}
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
        <Button type="submit">{t('Sign in')}</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
