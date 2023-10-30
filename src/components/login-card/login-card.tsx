'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useCustomerVerification } from '@/store/customer-verification';

import EmailLoginForm from './email-login-form';
import EmailRegisterForm from './email-register-form';
import PhoneLoginForm from './phonenumber-login-form';
import PhoneRegisterForm from './phonenumber-register-form';

export function LoginCard({ className }: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations('Index');
  const setVerificationSent = useCustomerVerification(
    state => state.setIsVerificationCodeSent
  );
  const setPhoneNumber = useCustomerVerification(state => state.setPhoneNumber);
  const [phoneLogin, setPhoneLogin] = useState(false);
  const [phoneRegister, setPhoneRegister] = useState(false);

  useEffect(() => {
    setVerificationSent(false);
    setPhoneNumber('');
  }, []);

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
            <div className="height-[50px] w-full border rounded-lg p-4 flex justify-between">
              <p className="text-sm text-muted-foreground">
                Login with phone number
              </p>
              <Switch
                checked={phoneLogin}
                onCheckedChange={() => {
                  setPhoneLogin(prevState => !prevState);
                }}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {phoneLogin ? <PhoneLoginForm /> : <EmailLoginForm />}
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
            <div className="height-[50px] w-full border rounded-lg p-4 flex justify-between">
              <p className="text-sm text-muted-foreground">
                Register with phone number
              </p>
              <Switch
                checked={phoneRegister}
                onCheckedChange={() => {
                  setPhoneRegister(prevState => !prevState);
                }}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {phoneRegister ? <PhoneRegisterForm /> : <EmailRegisterForm />}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default LoginCard;
