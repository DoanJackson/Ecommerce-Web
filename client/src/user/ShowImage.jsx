import { useEffect, useState } from "react";
import "../assets/imageHover.css";
import { BoxImage } from "./BoxImage.jsx";

const widthImg = "90px";
const heightImg = "90px";

function ImageComponent(props) {
  const [isHovered, setIsHovered] = useState(false);
  const imgLink = props.imageLink;

  function handleMouseOver() {
    setIsHovered(true);
  }

  function handleMouseOut() {
    setIsHovered(false);
  }

  function removeImage() {
    props.deleteImage();
  }

  return (
    <>
      <div
        className="image-container"
        onMouseEnter={handleMouseOver}
        onMouseLeave={handleMouseOut}
        style={{
          width: "90px",
          height: "90px",
          position: "relative",
          overflow: "hidden",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <img
          src={imgLink}
          alt="preview"
          className={`image ${isHovered ? "blur" : ""}`}
          style={{ width: widthImg, height: heightImg, objectFit: "cover" }}
        />
        {isHovered && (
          <button className="close-button" onClick={removeImage}>
            X
          </button>
        )}
      </div>
    </>
  );
}
function ShowImageInput(props) {
  const { index, removeImg } = props;
  const [imgLink, setImgLink] = useState(null);
  function setImg() {
    const imgUrl = URL.createObjectURL(props.image);
    setImgLink(imgUrl);
  }

  function removeImage() {
    removeImg(index);
  }

  useEffect(() => {
    setImg();
  }, [props.image]);
  return (
    <>
      <ImageComponent imageLink={imgLink} deleteImage={removeImage} />
    </>
  );
}
function ShowOtherImageInput(props) {
  const { deleteImageIndex, imageList } = props;
  const [imageListed, setImageList] = useState(imageList);

  function setAgainImageList() {
    setImageList(props.imageList);
  }

  function deleteImage(position) {
    deleteImageIndex(position);
  }

  useEffect(() => {
    setAgainImageList();
  }, [props.imageList]);

  return (
    <>
      <BoxImage>
        {imageListed.map((image, index) => (
          <ShowImageInput
            image={image}
            removeImg={deleteImage}
            index={index}
            key={index}
          />
        ))}
      </BoxImage>
    </>
  );
}
export { ShowImageInput, ShowOtherImageInput };
