import { Ilogin } from "@/interface/form.interface";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API;

// gets the form from the user login form and sends to the server to store the datas in the database
const login = async (logForm: Ilogin) => {
  try {
    const response = await axios.post(`${URL}/auth/login`, logForm);
    return response.data.logForm;
  } catch (err) {
    console.log(err);
  }
};

export default login;
