import type { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { NextIntlClientProvider } from 'next-intl';
import { useLocale } from 'next-intl';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { ThemeProvider } from '@/components/theme-provider';
import AuthProvider from '@/context/auth-provider';

import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ru' }, { lang: 'uz' }];
}

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const locale = useLocale();

  // Validate that the incoming `locale` parameter is a valid locale
  if (params.locale !== locale) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../../i18n/${params.locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider session={session}>
          <NextIntlClientProvider locale={params.locale} messages={messages}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
