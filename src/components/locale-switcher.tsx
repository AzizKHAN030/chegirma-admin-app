'use client';

import * as React from 'react';
import { useEffect } from 'react';

import { Check, ChevronsUpDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/client';

import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export function LocaleSwitcher() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const t = useTranslations('Index');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setValue(locale);
  }, [locale]);

  const onLocaleSwitch = (value: string) => {
    router.replace(pathname, { locale: value });
  };

  const languages = [
    { label: t('English'), value: 'en' },
    { label: t('Russian'), value: 'ru' },
    { label: t('Uzbek'), value: 'uz' },
  ] as const;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? languages.find(language => language.value === value)?.label
            : t('Select language')}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            {languages.map(language => (
              <CommandItem
                key={language.value}
                onSelect={() => {
                  onLocaleSwitch(language.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === language.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {language.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
