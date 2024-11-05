import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import "../assets/goodStyle.css";
import DialogDelete from "../Dialog/DialogDeleteItem";
import { useDispatch } from "react-redux";
import { showDetailActions } from "../store/select_good_slice";

function GoodItem(props) {
  const dispatch = useDispatch();
  const [good, setGood] = useState(props.data);
  const { type } = props;

  useEffect(() => {
    setGood(props.data);
  }, [props.data]);

  async function removeGood() {
    await props.deleteItem(good.id_good);
  }

  function handleCardClick() {
    if (type !== "good_merchant") {
      console.log("Click card");
      dispatch(showDetailActions.show({ id: good.id_good }));
    }
  }

  return (
    <>
      <Card
        sx={{
          width: 320,
          transition: "transform 0.3s ease",
          border: "1px solid transparent",
          "&:hover": {
            cursor: "pointer",
            transform: "translateY(-5px)",
            border: "1px solid red",
          },
        }}
        onClick={handleCardClick}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height={250}
            image={
              good.urlImage ||
              "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-r1.jpg"
            }
            alt="image iphone12"
            sx={{
              objectFit: "contain",
            }}
          />
          {type === "good_merchant" && <DialogDelete deleteItem={removeGood} />}
        </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ mb: 1 }}>
            {good.name}
          </Typography>
          <Box sx={{ width: 313, mb: 1 }}>
            <Stack
              spacing={{ xs: 1, sm: 0.5 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: "wrap" }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                gutterBottom
                mb={0}
                sx={{
                  "&:hover": {
                    fontWeight: "bold",
                    cursor: "pointer",
                  },
                }}
              >
                {good.type}
              </Typography>
            </Stack>
          </Box>
          <Typography gutterBottom variant="h7" component="div" sx={{ mb: 1 }}>
            Sold {good.numbersold}
          </Typography>
          <Typography gutterBottom variant="h7" component="div" sx={{ mb: 1 }}>
            Remaining {good.quantity}
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "#F57224" }}
          >
            {good.cost}$
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
export { GoodItem };
