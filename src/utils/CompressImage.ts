function resize(image: any): any {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');

    let width = image.width;
    let height = image.height;

    const max_width = 200;
    const max_height = 200;

    // calculate the width and height, constraining the proportions
    if (width > height) {
      if (width > max_width) {
        //height *= max_width / width;
        height = Math.round((height *= max_width / width));
        width = max_width;
      }
    } else {
      if (height > max_height) {
        //width *= max_height / height;
        width = Math.round((width *= max_height / height));
        height = max_height;
      }
    }

    // resize the canvas and draw the image data into it
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(image, 0, 0, width, height);
    }

    canvas.toBlob(
      (blob) => {
        resolve(blob);
      },
      'image/jpeg',
      0.7
    );

    // return canvas.toDataURL("image/jpeg",0.7); // get the data from canvas as 70% JPG (can be also PNG, etc.)

    // you can get BLOB too by using canvas.toBlob(blob => {});
  });
}

function compressImage(arrayBuffer: any, format: any): any {
  return new Promise((resolve, reject) => {
    let base64String = '';
    for (let i = 0; i < arrayBuffer.length; i++) {
      base64String += String.fromCharCode(arrayBuffer[i]);
    }

    const image = new Image();
    image.onload = async function () {
      const blob = await resize(image);
      const resizedArrayBuffer = await blob.arrayBuffer();
      const resizedArrayBuffer8 = new Uint8Array(resizedArrayBuffer);
      resolve(resizedArrayBuffer8);
    };
    image.src = `data:${format};base64,${window.btoa(base64String)}`;
  });
}

export { compressImage };
