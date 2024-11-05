import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [attribute, setAttribute] = useState([]);

  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:5000/api"); // Use HTTP if your backend does not support HTTPS
        console.log(response.data);
        setUsers(response.data.user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  async function postData() {
    await axios
      .post("http://localhost:5000/user", {
        data1: "okeoke",
        data2: "nicenice",
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getUser() {
    try {
      const result = await axios.get("http://localhost:5000/data");
      const data = result.data;
      console.log(data);
      setAttribute(data.arrayUsers);
      setIsHidden(false);
    } catch (err) {
      console.log(err);
    }
  }

  function removeUser() {
    setIsHidden(true);
  }

  async function changeData() {
    try {
      await axios.patch("http://localhost:5000/change");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {users.map((user, i) => (
        <React.Fragment key={i}>
          <div>user name: {user}</div>
        </React.Fragment>
      ))}
      <div>oke</div>
      <button onClick={postData}>send Data</button>
      <button onClick={getUser}>get users</button>
      <button onClick={removeUser}>removeUser</button>
      {isHidden === false &&
        attribute.map((item, i) => (
          <React.Fragment key={i + 5}>
            <div>
              id : {item.id}, email: {item.email}
            </div>
          </React.Fragment>
        ))}
      <button onClick={changeData}>change Data</button>
    </>
  );
}

export default App;

// // useEffect(() => {
// //   fetch("http://localhost:5000/api")
// //     .then((response) => response.json())
// //     .then((data) => {
// //       console.log(data);
// //       setUsers(data.user);
// //     })
// //     .catch((err) => console.log(err));
// // }, []);

// import { useEffect, useState } from "react";
// import axios from "axios";

// function App() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api");
//         console.log(response.data);
//         setUsers(response.data.user);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     })(); // Immediately invoked function
//   }, []);

//   async function postData() {
//     await axios
//       .post("http://localhost:5000/user", {
//         data1: "okeoke",
//         data2: "nicenice",
//       })
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   return (
//     <>
//       {users.map((user, i) => (
//         <div key={i}>user name: {user}</div>
//       ))}
//       <div>oke</div>
//       <button onClick={postData}>send Data</button>
//     </>
//   );
// }

// export default App;
