import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

function CarouselImage(props) {
  const carouselRef = useRef(null);
  const { listImage } = props;

  useEffect(() => {
    const result = setInterval(() => {
      const nextButton = carouselRef.current.querySelector(
        ".carousel-control-next"
      );
      nextButton.click();
    }, 3000);

    return () => clearInterval(result);
  }, []);

  return (
    <>
      <Box
        ref={carouselRef}
        id="carouselExample"
        className="carousel slide"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
          border: "2px solid",
        }}
        mb={0}
      >
        <div className="carousel-inner h-100">
          {listImage.map((item, index) => {
            if (index === 0) {
              return (
                <div className="carousel-item active h-100" key={index}>
                  <img
                    src={item.urlimage}
                    className="d-block w-100 h-100"
                    alt="..."
                    style={{ objectFit: "contain" }} // Co dãn đầy đủ và giữ tỷ lệ
                  />
                </div>
              );
            } else {
              return (
                <div className="carousel-item h-100" key={index}>
                  <img
                    src={item.urlimage}
                    className="d-block w-100 h-100"
                    alt="..."
                    style={{ objectFit: "contain" }} // Co dãn đầy đủ và giữ tỷ lệ
                  />
                </div>
              );
            }
          })}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </Box>
    </>
  );
}

export default CarouselImage;
