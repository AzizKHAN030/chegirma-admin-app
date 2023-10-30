'use client';

import { useState } from 'react';

import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next-intl/client';
import Link from 'next-intl/link';

import { Button } from '@/components/ui/button';
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
import { cn } from '@/lib/utils';
import { useCustomerVerification } from '@/store/customer-verification';
import { formatTime } from '@/util/formatTime';

import CounterProgressbar from '../counter-progressbar';

export function VerifyCard({ className }: React.HTMLAttributes<HTMLElement>) {
  const router = useRouter();
  const [counter, setCounter] = useState(0);
  const [resetCounter, setResetCounter] = useState(false);
  const [value, setValue] = useState('');

  const isCustomerVerificationStore = useCustomerVerification(
    state => state.isVerificationCodeSent
  );
  const phoneNumber = useCustomerVerification(state => state.phoneNumber);

  if (!isCustomerVerificationStore || !phoneNumber) {
    router.push('/auth');
  }

  const resetProgressBar = () => {
    setResetCounter(true);
  };

  const onBackButtonClick = () => {
    router.back();
  };

  const onVerify = async () => {
    const res = await signIn('phonenumber', {
      number: phoneNumber,
      code: value,
      redirect: false,
    });

    if (!res?.error) {
      router.push('/');
    }
  };

  const onResendClick = async () => {
    try {
      await axios.post('/auth/register', { username: phoneNumber });
      resetProgressBar();
    } catch (error) {}
  };

  const handleCountChange = (count: number) => {
    setCounter(count);
    setResetCounter(false);
  };

  return (
    <Card className={cn('w-[400px]', className)}>
      <CardHeader>
        <CardTitle>Verify</CardTitle>
        <CardDescription>
          Enter verification code you got via SMS
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <CounterProgressbar
            timerCount={60}
            onCountChange={handleCountChange}
            reset={resetCounter}
            className="h-[7px] mb-4"
          />
          <div className="flex justify-between mb-2">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code? &nbsp;
              <Link href="#" className="text-primary" onClick={onResendClick}>
                Resend
              </Link>
            </p>
            <span className="text-sm">{formatTime(counter)}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {phoneNumber} &nbsp;
            <Link href="/auth" className="text-primary">
              Change number
            </Link>
          </p>
        </div>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Code</Label>
              <Input
                id="name"
                placeholder="Verification code"
                value={value}
                onChange={e => setValue(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBackButtonClick}>
          Back
        </Button>
        <Button onClick={onVerify}>Verify</Button>
      </CardFooter>
    </Card>
  );
}

export default VerifyCard;
