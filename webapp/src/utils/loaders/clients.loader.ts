import { getClinics } from "../firebase/firestore";

const clientsLoader = () => getClinics();

export default clientsLoader;
