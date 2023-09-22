import { useEffect } from "react";

const AnimalDetection = ({animalData, imagePath }) => {
  
  useEffect(() => {
    animalData.forEach((dataArray) => {
      const boundingBoxes = Array.isArray(dataArray) ? [dataArray] : dataArray;
      
      boundingBoxes.forEach((data) => {
        const [x1, y1, x2, y2, className, probability] = data;
  
        const image = document.getElementById("animal-image");
        const imageWidth = image.width;
        const imageHeight = image.height;
  
        const boundingBox = document.createElement("div");
        boundingBox.className = "bounding-box";
        boundingBox.style.left = `${(x1 / imageWidth) * 100}%`;
        boundingBox.style.top = `${(y1 / imageHeight) * 100}%`;
        boundingBox.style.width = `${((x2 - x1) / imageWidth) * 100}%`;
        boundingBox.style.height = `${((y2 - y1) / imageHeight) * 100}%`;
        boundingBox.style.position = "absolute";
        boundingBox.style.border = "2px solid #3f51b5";
  
        const imageContainer = document.querySelector(".image-container");
        imageContainer.appendChild(boundingBox);
  
        const probabilityText =  document.getElementById("probabilityText");
        probabilityText.textContent = `${(probability * 100).toFixed(2)}% it's a ${className}`;
        probabilityText.style.left = `${(x1 / imageWidth) * 100}%`;
        probabilityText.style.top = `${(y1 / imageHeight) * 100}px`;
      });
    });
  }, [animalData]);

  return (
    <div className="image-wrapper relative mt-3 ">
      <div className="image-container inline-block relative">
        <p className="bg-indigo-500 py-3 px-5 max-h-fit absolute rounded-lg" id='probabilityText'></p>
        <img src={imagePath} alt="Animal Image" className="rounded-lg" id="animal-image" />
      </div>
    </div>
  );
};

export default AnimalDetection;