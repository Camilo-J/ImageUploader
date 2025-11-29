import { MainCard } from '@/components/mainView/componentCard';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <MainCard />
    </main>
  );
}
