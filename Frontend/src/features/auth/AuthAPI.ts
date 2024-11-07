import { loginSuccess } from "./authSlice";
import { AppDispatch } from "../../redux/store";

export const login = (credentials: { username: string; password: string }) => async (dispatch: AppDispatch) => {
  console.log("Login API called with:", credentials); // Add this to verify credentials
  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("API Response:", data); // Add this to check the response

    if (response.ok) {
      const { token, user } = data;
      dispatch(loginSuccess({ token, user }));
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error("Login failed", error);
  }
};
