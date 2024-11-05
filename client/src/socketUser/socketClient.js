// import io from "socket.io-client";

// const url = "http://localhost:5000";
// const socketClient = io(url, {
//   withCredentials: true,
//   transports: ["websocket"],
// });

// socketClient.on("connect", () => {
//   console.log("Socket connected: ", socketClient.id);
//   socketClient.on("posts", (data) => {
//     console.log("Received post event: ", data.post);
//   });
//   socketClient.on("disconnect", () => {
//     console.log("Server disconnect");
//   });
// });

// function sendMessageLoginSuccess(id) {
//   socketClient.emit("login", id);
// }

// function sendMessageSignOut() {
//   socketClient.emit("sign_out");
// }

// export default socketClient;
// export { sendMessageLoginSuccess, sendMessageSignOut };
