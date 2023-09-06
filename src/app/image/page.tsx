import { ImageUploaded } from "@/components/cardSuccess/cardImage";
import styles from "./page.module.css";

export default async function CardContainer({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  if (!searchParams) {
    return;
  }
  const data = searchParams.image;

  await new Promise((resolve) => setTimeout(resolve, 4000));

  return (
    <section className={styles.mainContainer}>
      <ImageUploaded url={data} />
    </section>
  );
}
