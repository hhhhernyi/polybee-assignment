import { fromUrl } from "geotiff";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import Canvas from "./Canvas";

const MainDisplay = () => {
  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState({});
  const [widthData, setWidthData ] = useState(0)
  const [heightData, setHeightData] = useState(0)
  const [rasterData, setRasterData] = useState(null);
  const cogFilePath = "https://csg100320027cb83207.blob.core.windows.net/sdi-assigments/sample.tif?sv=2023-01-03&st=2025-04-11T05%3A14%3A17Z&se=2025-04-20T05%3A14%3A00Z&sr=b&sp=r&sig=YLfMhF3AsE0zZtD4LTT51w2%2BE7yjc6GwUJpkroswwLs%3D";

  useEffect(() => {
    async function loadCOG() {
      setLoading(true);
      try {
        const tiff = await fromUrl(cogFilePath);
        const image = await tiff.getImage();
        setImageData(image);
        const data = await image.readRasters();
        setRasterData(data)
        const { width, height } = data;
        setHeightData(height)
        setWidthData(width)
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    loadCOG();
  }, [cogFilePath]);

  return loading ? <Loading /> : <Canvas imageData={imageData} widthData={widthData} heightData={heightData} rasterData={rasterData}/>;
};
export default MainDisplay;

