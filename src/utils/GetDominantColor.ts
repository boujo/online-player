
function calculateDominantColor(image: any): any {
  const canvas = document.createElement('canvas');

  const max_width = 500;
  const max_height = 500;
  const defaultRGB = { r: 0, g: 0, b: 0};

  let width = image.width;
  let height = image.height;

  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > max_width) {
      //height *= max_width / width;
      height = Math.round(height *= max_width / width);
      width = max_width;
    }
  } else {
    if (height > max_height) {
      //width *= max_height / height;
      width = Math.round(width *= max_height / height);
      height = max_height;
    }
  }

  // resize the canvas and draw the image data into it
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  let data = null;
  if (ctx) {
    ctx.drawImage(image, 0, 0, width, height);
    try {
      data = ctx.getImageData(0, 0, width, height);
    } catch(e) {
      /* security error, img on diff domain */
      return defaultRGB;
    }
  }


  const rgb = {r:0,g:0,b:0};
  if (data && data.data) {
    const dataLength = data.data.length;
    const blockSize = 5;
    let count = 0;
    let i = -4;
  
    while ( (i += blockSize * 4) < dataLength ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }
  
    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);
  }

  return rgb;
}

function getDominantColor(arrayBuffer: any, format: any) {
  return new Promise((resolve, reject) => {
    let base64String = "";
    for (let i = 0; i < arrayBuffer.length; i++) {
      base64String += String.fromCharCode(arrayBuffer[i]);
    }
  
    const image = new Image();
    image.onload = function() {
      const color = calculateDominantColor(image);
      resolve(color);
    };
    image.src = `data:${format};base64,${window.btoa(base64String)}`;;
  });
}


export { getDominantColor };