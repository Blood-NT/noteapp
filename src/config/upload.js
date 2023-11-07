import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";



// upload send image
export const uploadImage = async (file) => {
  if (!file) return;
  const sotrageRef = ref(storage, `image/thuytrang/${file.name}`);
  const snapshot = await uploadBytes(sotrageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
};
