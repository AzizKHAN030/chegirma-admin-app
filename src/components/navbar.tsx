'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next-intl/client';
import Link from 'next-intl/link';

import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import { LocaleSwitcher } from './locale-switcher';
import { ModeToggler } from './mode-toggler';
import { UserNav } from './user-nav';

type NavBarVariant = 'default' | 'base';

type NavBarProps = React.HTMLAttributes<HTMLElement> & {
  variant?: NavBarVariant;
};

export function NavBar({ className, variant, ...props }: NavBarProps) {
  const pathname = usePathname();
  const t = useTranslations('Index');

  const routes = [
    {
      href: '/',
      label: t('Dashboard'),
      active: pathname === '/',
    },
    {
      href: '/merchants',
      label: t('Merchants'),
      active: pathname === '/merchants',
    },
    {
      href: '/settings',
      label: t('Settings'),
      active: pathname === '/settings',
    },
  ];

  return (
    <>
      <nav className={cn('flex p-4 gap-4', className)} {...props}>
        {variant !== 'base' && (
          <div className="flex items-center space-x-4 lg:space-x-6">
            {routes.map(route => (
              <Link
                href={route.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  !route.active && 'text-muted-foreground'
                )}
                key={route.href}
              >
                {route.label}
              </Link>
            ))}
          </div>
        )}
        <ModeToggler className="ml-auto h-[40px] w-[40px] self-center" />
        <LocaleSwitcher />
        {variant !== 'base' && <UserNav className="self-center" />}
      </nav>
      <Separator />
    </>
  );
}

export default NavBar;
