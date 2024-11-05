import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebaseConfig.js";

async function pushImage(file, directoryFile) {
  return new Promise((resolve, reject) => {
    const imageRef = ref(storage, directoryFile);
    const uploadTask = uploadBytesResumable(imageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error.message);
        reject("Error from upload image to cloud storage");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File availabel at ", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
}

async function deleteFile(directoryFile) {
  return new Promise((resolve, reject) => {
    const fileRef = ref(storage, directoryFile);
    deleteObject(fileRef)
      .then(() => {
        console.log("Delete file name: ", directoryFile, " successful!!!");
        resolve("success");
      })
      .catch((error) => {
        console.log("Error when delete file name: ", directoryFile);
        reject("fail");
      });
  });
}

export { pushImage, deleteFile };
