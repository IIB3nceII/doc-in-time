import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase.config";

const getImageByURL = async (url: string) => {
  try {
    const r = await getDownloadURL(ref(storage, `${process.env.REACT_APP_FIREBASE_STORAGE_LOCATION}${url.trim()}`));
    return r;
  } catch (err) {
    console.error(err);
  }
};

export { getImageByURL };
