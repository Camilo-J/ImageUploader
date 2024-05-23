import styles from "./page.module.css";
import { MainCard } from "@/components/mainView/componentCard";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className={styles.main}>
      <Suspense>
        <MainCard />
      </Suspense>
    </main>
  );
}
