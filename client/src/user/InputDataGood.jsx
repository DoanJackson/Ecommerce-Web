import { useEffect, useState } from "react";
import { getDataLocal } from "./GetDataLocal";
import axios from "axios";
import { url } from "../Login/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  FormControl,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { pushImage } from "../../push_file_to_cloud/pushData.js";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { ShowOtherImageInput } from "./ShowImage.jsx";
import { v4 as uuidv4 } from "uuid";
import { notifyError, notifySuccess } from "./Notification.jsx";
import { InputDataForm } from "./InputDataGoodForm.jsx";
import { InputDataMainImage } from "./InputDataMainImage.jsx";
import { Overlay } from "../Loading/LoadingPage.jsx";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const widthTitle = "100px";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

//Input data select
function InputDataFormSelect(props) {
  const [data, setData] = useState(props.data);
  const [listType, setListType] = useState([]);

  function handleOnChange(e) {
    props.setDataGood({
      [data.label]: e.target.value,
    });
  }

  async function getListTypeOfGood() {
    const dataLocal = getDataLocal();
    if (dataLocal === undefined) {
      console.log("Error from retrieving data local");
      return;
    }

    try {
      await axios
        .post(url + "/api/get-list-type-good", {})
        .then((response) => {
          const result = response.data;
          if (result.success) {
            setListType(result.data);
          } else {
            console.log("Get list type of data fail!!!");
          }
        })
        .catch((err) => {
          console.log(
            "Error from get list type of good with /api/get-list-type-good, error: ",
            err
          );
        });
    } catch (err) {
      console.log("Error from get list type of good");
    }
  }

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  useEffect(() => {
    getListTypeOfGood();
  }, []);

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
          {data.label}:
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Select
            value={data.value || ""}
            onChange={handleOnChange}
            MenuProps={MenuProps}
            size="small"
            sx={{ minWidth: 210 }}
            fullWidth
          >
            <MenuItem value="" disabled>
              None
            </MenuItem>
            {listType.map((item) => (
              <MenuItem key={item.type} value={item.type}>
                {item.type}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    </>
  );
}

//Input data another images of good
function InputDataOtherImage(props) {
  //contain information about title
  const [data, setData] = useState(props.data);
  //label, value, title
  const { removeImageIndex } = props;

  function handleOnChange(e) {
    const inputFileArray = Array.from(e.target.files);
    const result = inputFileArray.filter(
      (item) =>
        !data.value.some((existingItem) => existingItem.name === item.name)
    );
    if (result.length !== 0) {
      props.setDataGood({
        [data.label]: [...data.value, ...result],
      });
    }
    e.target.value = null;
  }

  function deleteImageIndex(position) {
    removeImageIndex(position);
  }

  useEffect(() => {
    setData(props.data);
    console.log(props.data);
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
            Upload Other Image
            <VisuallyHiddenInput
              type="file"
              onChange={handleOnChange}
              multiple
            />
          </Button>
        </Box>
      </Box>
      {data.value.length !== 0 && (
        <ShowOtherImageInput
          imageList={data.value}
          deleteImageIndex={deleteImageIndex}
        />
      )}
    </>
  );
}

// Component to push all information about good to cloud and db
function FormInsertGood(props) {
  const [dataGood, setDataGood] = useState({
    name: "",
    quantity: 0,
    cost: 0,
    type: "",
    mainImage: null,
    otherImage: [],
  });

  const [loading, setLoading] = useState(false);

  function setData(data) {
    setDataGood((prevValue) => ({
      ...prevValue,
      ...data,
    }));
  }

  function removeMainImage() {
    setDataGood((prevValue) => ({
      ...prevValue,
      mainImage: null,
    }));
  }

  function removeImageIndex(position) {
    const resultArray = dataGood.otherImage.filter(
      (_, index) => index !== position
    );
    setData({ otherImage: resultArray });
  }

  async function pushPlainDataGood() {
    const dataLocal = getDataLocal();
    if (dataLocal === undefined) {
      const message = "Error from get data local";
      console.log(message);
      return { success: false, message: message };
    }

    const infor = {
      name: dataGood.name,
      quantity: parseInt(dataGood.quantity, 10),
      numberSold: 0,
      cost: parseInt(dataGood.cost, 10),
      type: dataGood.type,
      id_merchant: dataLocal.id,
    };
    const result = await axios.post(url + "/api/good/post-data", infor, {
      headers: {
        Authorization: `Bearer ${dataLocal.token}`,
      },
    });
    return result.data;
  }

  async function handleSubmit() {
    if (
      dataGood.type === "" ||
      dataGood.name === "" ||
      dataGood.quantity <= 0 ||
      dataGood.mainImage === null
    ) {
      notifyError("You have missing input data.");
    } else {
      try {
        setLoading(true);
        const dataLocal = getDataLocal();
        if (dataLocal === undefined) {
          console.log("Error from get data local");
          return;
        }

        const result = await pushPlainDataGood();
        const arr = [];
        //push main image to firebase
        try {
          const idMainImage = uuidv4();
          const directoryFileMain =
            "/images/" +
            dataLocal.id +
            "/" +
            result.id_good +
            "/main_picture/" +
            idMainImage;
          const resultPushImage = await pushImage(
            dataGood.mainImage,
            directoryFileMain
          );
          arr.push({
            id: idMainImage,
            fileDirectory: directoryFileMain,
            urlImage: resultPushImage,
            type: "main",
          });
          try {
            const promises = dataGood.otherImage.map(async (image) => {
              const idImage = uuidv4();
              const directoryFile =
                "/images/" +
                dataLocal.id +
                "/" +
                result.id_good +
                "/" +
                idImage;
              const otherImages = await pushImage(image, directoryFile);
              arr.push({
                id: idImage,
                fileDirectory: directoryFile,
                urlImage: otherImages,
                type: "normal",
              });
            });
            await Promise.all(promises);
          } catch (error) {
            console.log("Error from uploading other images, error: ", error);
          }
        } catch (err) {
          console.log("Error from uploading main image");
        }

        //push plain data of good
        if (result.success) {
          //Insert infor of main image to image
          const idGood = result.id_good;
          const updatedArray = arr.map((item) => {
            return {
              ...item,
              idGood: idGood,
            };
          });
          try {
            const resultUp = await axios.post(
              url + "/api/good/post-other-images",
              { dataOtherImages: updatedArray },
              {
                headers: {
                  Authorization: `Bearer ${dataLocal.token}`,
                },
              }
            );
            const message = resultUp.data.message;
            if (resultUp.data.success) {
              notifySuccess(message);
              props.hideForm();
            } else {
              notifyError(message);
            }
          } catch (error) {
            console.log(
              "Error from insert main image to image, error: ",
              error
            );
          }
        } else {
          //failed
          console.log("Failed from uploading image to cloud firebase");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  }

  function cancel() {
    props.hideForm();
  }

  return (
    <>
      {/* Loading state */}
      {loading && <Overlay />}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            py: 4,
            mx: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant="h4">Input your information's good</Typography>
          <FormControl size="medium" sx={{ width: "25em", pb: 2 }}>
            <InputDataForm
              data={{ label: "name", value: dataGood.name }}
              message="Input your good's name"
              setDataGood={setData}
            />
            <InputDataForm
              data={{ label: "quantity", value: dataGood.quantity }}
              message="Input your quantity of good"
              setDataGood={setData}
            />
            <InputDataForm
              data={{ label: "cost", value: dataGood.cost }}
              message="Input your cost of good"
              setDataGood={setData}
            />
            <InputDataFormSelect
              data={{ label: "type", value: dataGood.type }}
              message="Input your type of good"
              setDataGood={setData}
            />
            <InputDataMainImage
              data={{
                label: "mainImage",
                value: dataGood.mainImage,
                title: "Main image",
              }}
              setDataGood={setData}
              removeDataMainImage={removeMainImage}
            />
            <InputDataOtherImage
              data={{
                label: "otherImage",
                value: dataGood.otherImage,
                title: "Other images",
              }}
              setDataGood={setData}
              removeImageIndex={removeImageIndex}
            />
          </FormControl>
          <Box sx={{ width: "25em", sx: 2, sm: 2 }}>
            <Button variant="contained" size="medium" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="outlined" size="medium" onClick={cancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      </div>
    </>
  );
}

export { FormInsertGood };
