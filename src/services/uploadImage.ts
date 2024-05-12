/**
 * Uploads an image file to the server and returns the URL of the uploaded image.
 * @param file - The image file to upload.
 * @param imageType - The type of the image file.
 * @returns A Promise that resolves to the URL of the uploaded image, or an error object if the upload fails.
 */
async function getUrl(file: File, imageType: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images`, {
    method: "POST",
    body: file,
    headers: {
      "Content-Type": `${imageType}`,
    },
  });
  let data;
  try {
    data = await res.json();
    return data;
  } catch (error) {
    return {
      body: {
        error: "Error uploading image",
      },
    };
  }
}

export default getUrl;
