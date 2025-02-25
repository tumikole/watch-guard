import axios from "axios";
import * as actions from "../ActionTypes";

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const userDataResponse = await axios.post("http://localhost:4000/login", { email, password });
      console.log({ userDataResponse })

      //   if (response.data.success) {
      if (userDataResponse.data.token) {
        localStorage.setItem("token", JSON.stringify(userDataResponse.data.token));
        localStorage.setItem("user", JSON.stringify(userDataResponse.data.user));
        localStorage.setItem("type", JSON.stringify(userDataResponse.data.userType));

        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedUserType = JSON.parse(localStorage.getItem("type"));


        dispatch({
          type: actions.LOGIN_USER,
          payload: storedUser,
        });

        return {storedUser, storedUserType}
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (e) {
      console.error("Login error:", e);
    }
  };
};


