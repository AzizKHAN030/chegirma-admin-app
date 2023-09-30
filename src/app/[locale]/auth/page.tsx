import React from 'react';
import LoginCard from '@/components/login-card';
import { getServerSession } from 'next-auth/next';
import type { NextRequest } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next-intl/server';

export default async function LoginPage(req: NextRequest): Promise<any> {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect('/');
  }

  return <LoginCard className="mx-auto pt-40" />;
}
