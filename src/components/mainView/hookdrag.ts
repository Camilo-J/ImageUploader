import reducerHook from "./hookReducer";
import { useReducer, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, DragEvent } from "./types";
import { getFile } from "./utils";

function useDragAndDrop() {
  const [data, dispatch] = useReducer(reducerHook, {
    dropped: false,
    file: null,
    isDragging: false,
  });
  const [isloading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams()!;
  // onDragEnter sets inDropZone to true
  const handleDragEnter = (e: DragEvent) => {
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
  const handleDragLeave = (e: DragEvent) => {
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
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log("over the zone");
    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = "copy";
    // dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDrop sets inDropZone to false and adds files to fileList
  const handleDrop = async (e: DragEvent) => {
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

  const handleFileChange = async (e: ChangeEvent) => {
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

  return {
    data,
    isloading,
    methods: {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      handleFileChange,
    },
  };
}

export default useDragAndDrop;
