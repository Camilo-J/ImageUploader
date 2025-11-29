'use client';

import Image from 'next/image';
import { useState } from 'react';
import styles from './page.module.css';

export function ImageUploaded({ url }: { url: string }) {
  const [copy, setCopy] = useState(false);

  const onCopy = () => {
    const input = document.querySelector('input');
    if (input === null) return;

    input.select();
    input.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(input.value);
    setCopy(true);
  };

  return (
    <section className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.checkContainer}>
          <Image src="check-svgrepo-com.svg" width={30} height={30} alt="icon-check" />
        </div>
        <p>Upload Succesfull!</p>
      </div>
      <div className={styles.imageContainer}>
        <Image src={url} width={300} height={300} alt="" />
      </div>
      <div className={styles.containerInput}>
        <input className={styles.input} type="text" value={url} disabled />
        <button type="button" className={`${styles.button} ${copy ? styles['button--active'] : ''}`} onClick={onCopy}>
          {copy ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </section>
  );
}
