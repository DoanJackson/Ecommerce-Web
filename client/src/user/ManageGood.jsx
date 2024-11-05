import { useEffect, useState } from "react";
import { getDataLocal } from "./GetDataLocal";
import axios from "axios";
import { url } from "../Login/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { FormInsertGood } from "./InputDataGood.jsx";
import { ListGood } from "../good/ListGood.jsx";

// Create name of store
function CreateNameStore(props) {
  const [nameOfShop, setNameOfShop] = useState("");

  function handleOnChange(e) {
    setNameOfShop(e.target.value);
  }

  async function addNameStore() {
    const localData = getDataLocal();
    if (localData === undefined) {
      console.log("Error from get local data");
      return;
    }

    try {
      await axios
        .post(
          url + "/api/user/add-name-store",
          { nameshop: nameOfShop },
          {
            headers: {
              Authorization: `Bearer ${localData.token}`,
            },
          }
        )
        .then((response) => {
          if (response.data.success) {
            props.updateName(nameOfShop);
          }
        })
        .catch((err) => {
          console.log("Error from add name to store, error: ", err);
        });
    } catch (err) {
      console.log("Error from add name to store, error: ", err);
    }
  }

  return (
    <>
      <Box
        sx={{
          py: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h3">Your store don't have name</Typography>
        <Typography variant="subtitle1" mt={2}>
          Add your store's name:
        </Typography>
        <FormControl size="medium" sx={{ width: "20em", marginTop: 2 }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Input your store name"
            value={nameOfShop}
            onChange={handleOnChange}
          />
          <Button
            variant="contained"
            color="success"
            sx={{ marginTop: 2 }}
            onClick={addNameStore}
          >
            Submit
          </Button>
        </FormControl>
      </Box>
    </>
  );
}

//Manage Information about store
function YourStore(props) {
  const [yourStore, setYourStore] = useState(props.dataStore);
  const [showForm, setShowForm] = useState(false);

  function setData() {
    setYourStore(props.dataStore);
  }

  function addGood() {
    setShowForm(true);
  }

  function hideForm() {
    setShowForm(false);
  }

  useEffect(() => {
    setData();
  }, [props.dataStore]);

  return (
    <>
      {!showForm && (
        <>
          <Box
            display={"flex"}
            alignItems={"center"}
            sx={{
              pt: 2,
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              ml: 3,
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/869/869636.png "
              style={{ width: "80px", height: "80px", marginRight: "20px" }}
            />
            <Typography variant="h4" color="#0B4F6C">
              {yourStore.nameshop}
            </Typography>
          </Box>
          <hr />

          <Box
            display={"flex"}
            alignItems={"center"}
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              ml: 3,
            }}
          >
            <Button variant="outlined" onClick={addGood}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#4791DB"
              >
                <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
              </svg>
              Add good
            </Button>
          </Box>
          <hr />
          <ListGood />
        </>
      )}
      {showForm && (
        <>
          <FormInsertGood hideForm={hideForm} />
        </>
      )}
    </>
  );
}

function ManageStore() {
  const [yourStore, setYourStore] = useState({});

  async function getDataStore() {
    const localData = getDataLocal();
    if (localData === undefined) {
      console.log("Error from retrieving local data");
      return;
    }

    try {
      await axios
        .post(
          url + "/api/user/store",
          {},
          {
            headers: {
              Authorization: `Bearer ${localData.token}`,
            },
          }
        )
        .then((response) => {
          const res = response.data;
          console.log(res);
          setYourStore({
            nameshop: res.data.nameshop,
          });
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    } catch (err) {
      console.log("Error from retrieve api/user/store, error: ", err);
    }
  }

  function updateNameShop(name) {
    setYourStore({
      nameshop: name,
    });
  }

  useEffect(() => {
    getDataStore();
  }, []);

  return (
    <>
      {yourStore.nameshop === null && (
        <CreateNameStore updateName={updateNameShop} />
      )}
      {yourStore.nameshop !== null && (
        <>
          <YourStore dataStore={yourStore} />
        </>
      )}
    </>
  );
}
export default ManageStore;
