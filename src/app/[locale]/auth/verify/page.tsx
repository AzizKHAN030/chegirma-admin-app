import React from 'react';

import { getServerSession } from 'next-auth/next';
import { redirect } from 'next-intl/server';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import VerifyCard from '@/components/login-card/verify-card';

export default async function VerifyPage(props): Promise<any> {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect('/');
  }

  return <VerifyCard className="mx-auto mt-40" />;
}
