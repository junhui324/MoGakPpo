const base64Regex = /data:image\/[^;]+;base64[^"]+/g; //

export const findBase64 = (editorContent: string) => {
  const base64DataArray = editorContent.match(base64Regex) || [];
  return base64DataArray;
};

function getExtensionFromMimeType(mimeType: string): string {
  // MIME 유형을 기반으로 파일 확장자를 결정합니다.
  switch (mimeType) {
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/gif':
      return 'gif';
    // 다른 유형의 파일에 대한 처리를 추가할 수 있습니다.
    default:
      return 'unknown';
  }
}

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
    const extension = getExtensionFromMimeType(mimeString);
    const file = new File([blob], `${fileName}-${index}.${extension}`, { type: mimeString });

    imageFiles.push(file);
  });
  return imageFiles;
}

export function base64imgSrcParser(htmlCode: string, urls: string[]) {
  let currentIndex = 0;
  const updatedHtmlCode = htmlCode.replace(base64Regex, (match, src) => {
    const replacedSrc = urls[currentIndex]; // 배열에서 현재 인덱스에 해당하는 URL을 가져옵니다.
    currentIndex++; // 다음 인덱스로 이동합니다.
    return replacedSrc; // src 속성 값을 변경하여 반환합니다.
  });

  return updatedHtmlCode;
}
