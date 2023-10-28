'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next-intl/client';

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
import { useCustomerVerificationStore } from '@/store/customer-verification';
import { formatTime } from '@/util/formatTime';

import CounterProgressbar from '../counter-progressbar';

export function VerifyCard({ className }: React.HTMLAttributes<HTMLElement>) {
  const router = useRouter();
  const [counter, setCounter] = useState(0);
  const isCustomerVerificationStore = useCustomerVerificationStore(
    state => state.isVerificationCodeSent
  );

  if (!isCustomerVerificationStore) {
    router.push('/auth/login');
  }

  const onBackButtonClick = () => {
    router.back();
  };

  const handleCountChange = (count: number) => {
    setCounter(count);
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
            className="h-[7px] mb-4"
          />
          <div className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code? &nbsp;
              <a href="#" className="text-primary">
                Resend
              </a>
            </p>
            <span className="text-sm">{formatTime(counter)}</span>
          </div>
        </div>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Code</Label>
              <Input id="name" placeholder="Verification code" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onBackButtonClick}>
          Back
        </Button>
        <Button>Verify</Button>
      </CardFooter>
    </Card>
  );
}

export default VerifyCard;
