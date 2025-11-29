'use client';
import Image from 'next/image';
import LoadingCard from '../loading/loading';
import useDragAndDrop from './hookdrag';
import styles from './page.module.css';

export const MainCard = () => {
  const { data, isLoading, methods } = useDragAndDrop();

  return isLoading ? (
    <LoadingCard />
  ) : (
    <section className={styles.mainCard}>
      <div className={styles.container}>
        <div className={styles.cardHeader}>
          <h1>Upload your image</h1>
          <p>File should be Jpeg,Png,..</p>
        </div>
        <form className={styles.form} action="" method="post">
          <button
            className={`${styles.area} ${data.isDragging ? styles['area--active'] : null}`}
            onDragEnter={methods.handleDragEnter}
            onDragOver={methods.handleDragOver}
            onDragLeave={methods.handleDragLeave}
            onDrop={methods.handleDrop}
            tabIndex={0}
            aria-label="Drag and drop your image here"
            type="button"
          >
            <Image src="/image.svg" loading="eager" width={114} height={88} alt="logo-Drag&Drop" />
            <span>Drag & Drop your image here</span>
          </button>
          <span>or</span>
          <label htmlFor="file" className={styles.btn}>
            <input type="file" name="file" id="file" hidden onChange={methods.handleFileChange} />
            Choose a file
          </label>
        </form>
      </div>
    </section>
  );
};
