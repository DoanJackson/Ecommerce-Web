import { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { widthTitle } from "./InputDataGood";
function InputDataForm(props) {
  const [data, setData] = useState(props.data);
  //label, value

  function handleOnChange(e) {
    props.setDataGood({
      [data.label]: e.target.value,
    });
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
          {data.label}:
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            name={data.label}
            value={data.value}
            size="small"
            placeholder={props.message}
            onChange={handleOnChange}
            fullWidth
          />
        </Box>
      </Box>
    </>
  );
}
export { InputDataForm };
