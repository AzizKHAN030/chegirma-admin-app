import { useTranslations } from 'next-intl';

function Home() {
  const t = useTranslations('Index');

  return <>{t('Hello world')}</>;
}

export default Home;
