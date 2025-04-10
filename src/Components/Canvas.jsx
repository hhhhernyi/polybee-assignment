import React, { useEffect, useRef, } from "react";

const Canvas = (props) => {
  const rasterData = props.rasterData; // Get rasterData from props
  const width = props.widthData;
  const height = props.heightData;
  const canvasRef = useRef(null);

  useEffect(() => {
    function drawImage() {
      const canvas = canvasRef.current;
      const ctx = canvas ? canvas.getContext("2d") : null;

      if (ctx && width > 0 && height > 0 && rasterData) {
        canvas.width = width;
        canvas.height = height;
        const imageData = ctx.createImageData(width, height);
        //const rgba = imageData.data;
        const samplesPerPixel = props.imageData?.getSamplesPerPixel() || 1;

        // Step 1:  Create a Uint8ClampedArray to hold the pixel data
        const uint8ClampedArray = new Uint8ClampedArray(width * height * 4); // RGBA: 4 bytes per pixel

        // Step 2:  Convert your rasterData to the Uint8ClampedArray
        let r, g, b, a;
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const pixelIndex = y * width + x;
            const rgbaIndex = (y * width + x) * 4;

            if (samplesPerPixel === 1 && rasterData[0]) {
              const value = rasterData[0][pixelIndex];
              r = value;
              g = value;
              b = value;
              a = 255;
            } else if (samplesPerPixel === 3 && rasterData.length === 3) {
              r = rasterData[0][pixelIndex];
              g = rasterData[1][pixelIndex];
              b = rasterData[2][pixelIndex];
              a = 255;
            } else if (samplesPerPixel === 4 && rasterData.length === 4) {
                r = rasterData[0][pixelIndex];
                g = rasterData[1][pixelIndex];
                b = rasterData[2][pixelIndex];
                a = rasterData[3][pixelIndex];
            }

             else {
              console.warn("Unsupported samples per pixel:", samplesPerPixel);
              return;
            }
            uint8ClampedArray[rgbaIndex] = r;
            uint8ClampedArray[rgbaIndex + 1] = g;
            uint8ClampedArray[rgbaIndex + 2] = b;
            uint8ClampedArray[rgbaIndex + 3] = a;
          }
        }
        // Step 3:  Assign the converted data to the ImageData object
        imageData.data.set(uint8ClampedArray);
        ctx.putImageData(imageData, 0, 0);
      }
    }

    drawImage();
  }, [width, height, rasterData, props.imageData]);
  

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ border: "1px solid black" }}
    />
  );
};

export default Canvas;
