import { Box, Typography } from "@mui/material";

function DetailItem(props) {
  const { label, value } = props;

  return (
    <>
      <Box
        sx={{
          mx: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          mr={1}
          sx={{ textTransform: "capitalize", width: "120px" }}
        >
          {label}:
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="subtitle1"
            mr={1}
            sx={{ textTransform: "capitalize", width: "200px" }}
          >
            {value}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
export default DetailItem;
