import { Box } from "@mui/material";
function BoxImage(props) {
  return (
    <Box
      sx={{
        mx: 2,
        mt: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        border: "1px dashed #ccc",
        borderRadius: "7px",
      }}
    >
      <Box 
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          maxHeight: "300px",
          overflowY: "auto",
          overflowX: "hidden",
          padding: 2,
          border: "1px solid #ccc",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  );
}

export { BoxImage };
