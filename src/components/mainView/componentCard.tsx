"use client";
import styles from "./page.module.css";
import Image from "next/image";
import reducerHook from "./hookReducer";
import LoadingCard from "../loading/loading";
import { useReducer, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getFile } from "./utils";

export const MainCard = () => {
  const [data, dispatch] = useReducer(reducerHook, {
    dropped: false,
    file: null,
    isDragging: false,
  });
  const [isloading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams()!;

  // onDragEnter sets inDropZone to true
  const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({
      type: "SET_IS_DRAGGING",
      dropped: false,
      isDragging: true,
      file: null,
    });
  };

  // onDragLeave sets inDropZone to false
  const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({
      type: "SET_IS_DRAGGING",
      isDragging: false,
      file: null,
      dropped: false,
    });
  };

  // onDragOver sets inDropZone to true
  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log("over the zone");
    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = "copy";
    // dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDrop sets inDropZone to false and adds files to fileList
  const handleDrop = async (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // get files from event on the dataTransfer object as an array
    const fileUploaded = e.dataTransfer.files;

    // ensure a file or files are dropped
    if (!fileUploaded) {
      dispatch({
        type: "SET_IN_DROP_ZONE",
        isDragging: false,
        file: null,
        dropped: false,
      });
      return;
    }

    setIsLoading(true);
    const response = await getFile(fileUploaded, searchParams.toString());
    if (response.error) {
      dispatch({
        type: "SET_IN_DROP_ZONE",
        isDragging: false,
        file: null,
        dropped: false,
      });
      return;
    }

    dispatch({
      type: "SET_IN_DROP_ZONE",
      isDragging: false,
      file: fileUploaded[0],
      dropped: true,
    });

    router.push("/image?" + response.body);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const fileUploaded = e.target.files;
    if (!fileUploaded) {
      dispatch({
        type: "SET_IN_DROP_ZONE",
        isDragging: false,
        file: null,
        dropped: false,
      });
      return;
    }
    setIsLoading(true);
    const response = await getFile(fileUploaded, searchParams.toString());

    if (response.error) {
      dispatch({
        type: "SET_IN_DROP_ZONE",
        isDragging: false,
        file: null,
        dropped: false,
      });
      return;
    }

    dispatch({
      type: "SET_IN_DROP_ZONE",
      isDragging: false,
      file: fileUploaded[0],
      dropped: true,
    });

    router.push("/image?" + response.body);
  };
  return isloading ? (
    <LoadingCard />
  ) : (
    <section className={styles.mainCard}>
      <div className={styles.container}>
        <div className={styles.cardHeader}>
          <h1>Upload your image</h1>
          <p>File should be Jpeg,Png,..</p>
        </div>
        <form className={styles.form} action="" method="post">
          <div
            className={`${styles.area} ${
              data.isDragging ? styles["area--active"] : null
            }`}
            onDragEnter={(e) => handleDragEnter(e)}
            onDragOver={(e) => handleDragOver(e)}
            onDragLeave={(e) => handleDragLeave(e)}
            onDrop={(e) => handleDrop(e)}
          >
            <Image
              src="/image.svg"
              width={114}
              height={88}
              alt="logo-Drag&Drop"
            />
            <span>Drag & Drop your image here</span>
          </div>
          <span>or</span>
          <label htmlFor="file" className={styles.btn}>
            <input
              type="file"
              name="file"
              id="file"
              hidden
              onChange={handleFileChange}
            />
            Choose a file
          </label>
        </form>
      </div>
    </section>
  );
};
