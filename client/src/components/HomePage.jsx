import NavBar from "../Navbar/NavBar";
import { url, useAuth } from "../Login/AuthContext.jsx";
// import { removeFileCloud } from "../../push_file_to_cloud/removeImageFromCloud";
import { getDataLocal } from "../user/GetDataLocal.jsx";
import axios from "axios";

function HomePage() {
  const { auth } = useAuth();

  // async function getFilePath() {
  //   const dataLocal = getDataLocal();
  //   if (dataLocal === undefined) {
  //     console.log("Error from get data local");
  //     return;
  //   }

  //   try {
  //     const result = await axios.post(
  //       url + "/api/merchant/good",
  //       { id: "471603fe-eb90-451b-b3e5-fac7b5a9782e" },
  //       { headers: { Authorization: `Bearer ${dataLocal.token}` } }
  //     );
  //     console.log(result.data);
  //   } catch (err) {
  //     console.log("Error from get file path url");
  //   }
  // }

  return (
    <>
      <NavBar />
      <div>Home page</div>
      {auth.isLog && <button>transmission data</button>}
      {/* <button onClick={getFilePath}>getData</button> */}
    </>
  );
}

export default HomePage;
