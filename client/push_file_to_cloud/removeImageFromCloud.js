import { deleteObject, ref } from "firebase/storage";
import { storage } from "../firebaseConfig";

async function removeFileCloud(path) {
  const desertRef = ref(storage, path);

  try {
    await deleteObject(desertRef);
    console.log("Delete file successfully");
    return { success: true };
  } catch (err) {
    console.error("Error from delete file in cloud, err: ", err);
    return { success: false, error: err };
  }
}

export { removeFileCloud };
