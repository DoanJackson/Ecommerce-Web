import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import { Input, Grid2 } from "@mui/material";
import axios from "axios";
import { url } from "../Login/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { formBuyActions } from "../store/form_submit_buy";

function SelectAddress() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.formBuy);

  const [listCity, setListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);

  function handleChangeCity(event, child) {
    const name = event.target.value;
    const id = child.props["data-id"].toString();
    if (name == "") {
      dispatch(formBuyActions.setDistrict(""));
    }
    dispatch(formBuyActions.setcity({ name: name, id: id }));
  }

  function handleChangeDistrict(event, child) {
    const name = event.target.value;
    const id = child.props["data-id"].toString();
    dispatch(formBuyActions.setDistrict({ name: name, id: id }));
  }

  //remain to get town depend on district
  //update database for address of order

  //function to get city of Viet Nam
  async function getCity() {
    try {
      const resCity = await axios.get(url + "/api/province");
      const resData = resCity.data;
      if (resData.success) {
        // console.log("success get api city (or province)");
        setListCity(resData.results);
      } else {
        throw new Error("Fail get api city (or province)");
      }
    } catch (err) {
      console.log(err);
    }
  }

  //function to get district of Viet Nam
  async function getDistrict() {
    const idCity = data.address.city.id;
    if (idCity === "") return;
    else {
      try {
        const resDistrict = await axios.post(url + "/api/province/district", {
          id: idCity.toString(),
        });
        const resData = resDistrict.data;
        if (resData.success) {
          // console.log("success get api district of city");
          setListDistrict(resData.results);
        } else {
          throw new Error("Fail get api district of city");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  //load district of Viet Nam
  useEffect(() => {
    const fetchData = async () => {
      await getCity();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getDistrict();
    };
    fetchData();
  }, [data.address.city]);

  return (
    <div>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <FormControl
            variant="standard"
            sx={{ mt: 2, mr: 2 }}
            fullWidth
            required
          >
            <InputLabel id="demo-simple-select-standard-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={data?.address.city.name}
              onChange={handleChangeCity}
            >
              <MenuItem value="" data-id="">
                <em>None</em>
              </MenuItem>
              {listCity.map((item) => {
                return (
                  <MenuItem
                    value={item.province_name}
                    key={item.province_id}
                    data-id={item.province_id}
                  >
                    {item.province_name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <FormControl
            variant="standard"
            sx={{ mt: 2, mr: 2 }}
            fullWidth
            disabled={data.address.city.name === ""}
            required
          >
            <InputLabel id="demo-dialog-select-label">District</InputLabel>
            <Select
              labelId="demo-dialog-select-label"
              id="demo-dialog-select"
              value={data.address.district.name}
              onChange={handleChangeDistrict}
              input={<Input label="District" />}
            >
              <MenuItem value="" data-id="">
                <em>None</em>
              </MenuItem>
              {listDistrict.map((item) => {
                return (
                  <MenuItem
                    value={item.district_name}
                    key={item.district_id}
                    data-id={item.district_id}
                  >
                    {item.district_name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid2>
      </Grid2>
    </div>
  );
}
export default SelectAddress;
