import { ImageUploaded } from '@/components/cardSuccess/cardImage';
import styles from './page.module.css';

export default async function CardContainer(props: { searchParams?: Promise<{ [key: string]: string }> }) {
  const searchParams = await props.searchParams;
  if (!searchParams) {
    return;
  }
  const data = searchParams.image;

  return (
    <section className={styles.mainContainer}>
      <ImageUploaded url={data} />
    </section>
  );
}
