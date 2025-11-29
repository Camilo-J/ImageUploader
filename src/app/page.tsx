import { Suspense } from 'react';
import { MainCard } from '@/components/mainView/componentCard';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <Suspense>
        <MainCard />
      </Suspense>
    </main>
  );
}
