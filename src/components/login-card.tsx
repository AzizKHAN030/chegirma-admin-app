'use client';
import { MouseEvent } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useRouter } from 'next-intl/client';
import { signIn } from 'next-auth/react';

export function LoginCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const t = useTranslations('Index');
  const router = useRouter();
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordShown = () => {
    setPasswordShown(prevState => !prevState);
  };

  const onLogin = async (e: MouseEvent) => {
    e.preventDefault();
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
              {t('Enter your username and password to log in')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">{t('Username')}</Label>
              <Input id="username" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">{t('Password')}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={passwordShown ? 'text' : 'password'}
                />
                <div
                  className="absolute top-[50%] right-3 translate-y-[-50%] cursor-pointer"
                  onClick={togglePasswordShown}
                >
                  {passwordShown ? <EyeOff /> : <Eye />}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={onLogin}>{t('Sign in')}</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Create an account by entering email and password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">New password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={passwordShown ? 'text' : 'password'}
                />
                <div
                  className="absolute top-[50%] right-3 translate-y-[-50%] cursor-pointer"
                  onClick={togglePasswordShown}
                >
                  {passwordShown ? <EyeOff /> : <Eye />}
                </div>
              </div>
              <Label htmlFor="password-repeat">Confirm password</Label>
              <div className="relative">
                <Input
                  id="password-repeat"
                  type={passwordShown ? 'text' : 'password'}
                />
                <div
                  className="absolute top-[50%] right-3 translate-y-[-50%] cursor-pointer"
                  onClick={togglePasswordShown}
                >
                  {passwordShown ? <EyeOff /> : <Eye />}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Create an account</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default LoginCard;
