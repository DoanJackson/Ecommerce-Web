import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";

function ItemGoodCart(props) {
  const theme = useTheme();
  const {
    shop_name,
    name_good,
    quantity_bought,
    district,
    city,
    date_bought,
    type,
    url_main_image,
    payment,
  } = props.data;

  return (
    <>
      <Card
        sx={{
          width: "90%",
          transition: "transform 0.3s ease",
          border: "3px solid transparent",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          m: 2,
          "&:hover": {
            cursor: "pointer",
            borderColor: "#01579b",
          },
        }}
      >
        <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
          <StoreIcon />
          <Typography
            gutterBottom
            variant="h7"
            component="div"
            sx={{ mb: 0, width: "100%", pl: 1 }}
          >
            {shop_name}
          </Typography>
        </Box>
        <Divider
          orientation="horizontal"
          flexItem
          variant="fullwidth"
          sx={{
            borderBottomWidth: "2px",
            borderColor: theme.palette.mode === "dark" ? "#f3e5f5" : "#0277bd",
            opacity: 1,
          }}
        />
        <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <Box
            sx={{
              width: "15%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              ml: 2,
            }}
          >
            <CardMedia
              component="img"
              height={100}
              image={
                url_main_image ||
                "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-r1.jpg"
              }
              alt="image good"
              sx={{
                objectFit: "contain",
              }}
            />
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            variant="fullwidth"
            sx={{
              borderLeftWidth: "2px",
              borderColor:
                theme.palette.mode === "dark" ? "#f3e5f5" : "#0277bd",
              opacity: 1,
              ml: 3,
            }}
          />
          <Box sx={{ width: "75%", ml: 3, paddingBottom: 0 }}>
            <CardContent sx={{ padding: 0 }} style={{ paddingBottom: 0 }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ mb: 0 }}
              >
                {/* {good.name} */}
                {name_good}
              </Typography>

              <Typography
                gutterBottom
                variant="h7"
                component="div"
                sx={{ mb: 0 }}
              >
                Quantity: {quantity_bought}
              </Typography>
              <Typography
                gutterBottom
                variant="h7"
                component="div"
                sx={{ mb: 0 }}
              >
                Loai: {type}
              </Typography>
              <Typography
                gutterBottom
                variant="h7"
                component="div"
                sx={{ mb: 0 }}
              >
                Dia chi nhan: {district}, {city}
              </Typography>

              <Typography
                gutterBottom
                variant="h7"
                component="div"
                sx={{ mb: 0 }}
              >
                Ngay dat: {date_bought}
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#F57224", mr: 3 }}
                flexDirection={"row"}
                justifyContent={"flex-end"}
                display={"flex"}
              >
                Tong tien: {payment}${/* can xu ly tien */}
              </Typography>
            </CardContent>
          </Box>
        </Box>
      </Card>
    </>
  );
}

export { ItemGoodCart };
