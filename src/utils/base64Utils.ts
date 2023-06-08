export const findBase64 = (editorContent: string) => {
  const base64Regex = /data:image\/[^;]+;base64[^"]+/g; //
  const base64DataArray = editorContent.match(base64Regex) || [];
  return base64DataArray;
};

export function base64sToFiles(base64Images: string[], fileName: string) {
  const imageFiles: File[] = [];
  base64Images.forEach((base64Image, index) => {
    const byteString = atob(base64Image.split(',')[1]);
    const mimeString = base64Image.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });

    // Blob 객체를 File 객체로 변환합니다.
    const file = new File([blob], `${fileName}-${index}`, { type: mimeString });

    imageFiles.push(file);
  });
  return imageFiles;
}
