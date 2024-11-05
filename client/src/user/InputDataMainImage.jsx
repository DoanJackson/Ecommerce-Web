import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { BoxImage } from "./BoxImage";
import { VisuallyHiddenInput, widthTitle } from "./InputDataGood";
import { ShowImageInput } from "./ShowImage";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

//Input data main image of good
function InputDataMainImage(props) {
  //contain information about title
  const [data, setData] = useState(props.data);
  //label, value, title

  function handleOnChange(e) {
    props.setDataGood({
      [data.label]: e.target.files[0],
    });
    e.target.value = null;
  }

  function removeImage(index) {
    props.removeDataMainImage();
  }

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <>
      <Box
        sx={{
          mx: 2,
          mt: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          mr={1}
          sx={{ textTransform: "capitalize", width: widthTitle }}
        >
          {data.title}:
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            color="success"
            startIcon={<CloudUploadIcon />}
            fullWidth
          >
            Upload
            <VisuallyHiddenInput type="file" onChange={handleOnChange} />
          </Button>
        </Box>
      </Box>
      {data.value !== null && (
        <BoxImage>
          <ShowImageInput
            image={data.value}
            removeImg={removeImage}
            index={-1}
          />
        </BoxImage>
      )}
    </>
  );
}
export { InputDataMainImage };
