"use client";

import Image from "next/image";
import styles from "./page.module.css";

export function ImageUploded() {
  const onCopy = () => {
    const input = document.querySelector("input");
    if (input === null) return;

    input.select();
    input.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(input.value);
  };

  return (
    <section className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.checkContainer}>
          <Image src="check-svgrepo-com.svg" width={30} height={30} alt="" />
        </div>
        <p>Upload Succesfull!</p>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src="https://res.cloudinary.com/duvg6bjmi/image/upload/v1674086111/dnysnnvux09eu1stxw4ei023f9m9.png"
          width={300}
          height={300}
          alt=""
        />
      </div>
      <div className={styles.containerInput}>
        <input
          className={styles.input}
          type="text"
          value="https://res.cloudinary.com/duvg6bjmi/image/upload/v1689196366/dev/kfjplupiecdhnvvpt9g2.png"
          disabled
        />
        <button className={styles.button} onClick={onCopy}>
          Copy Link
        </button>
      </div>
    </section>
  );
}
