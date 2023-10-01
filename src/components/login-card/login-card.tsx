'use client';

import { useTranslations } from 'next-intl';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

import LoginForm from './login-form';
import RegisterForm from './register-form';

export function LoginCard({ className }: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations('Index');

  return (
    <Tabs defaultValue="login" className={cn('w-[400px]', className)}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">{t('Sign in')}</TabsTrigger>
        <TabsTrigger value="register">{t('Sign up')}</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>{t('Login')}</CardTitle>
            <CardDescription>
              {t('Enter your email and password to log in')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <LoginForm />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>{t('Create an account')}</CardTitle>
            <CardDescription>
              {t('Create an account by entering email and password')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <RegisterForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default LoginCard;
