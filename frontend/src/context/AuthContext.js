import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: null,
  // {
  //   _id: "65c9b63450d7a3647e6c8497",
  //   username: "akanksha",
  //   email: "akanksha@gmail.com",
  //   password: "$2b$10$cwVTG4faKtppjjWaovRlkOd1qFVZzudfRntaEmLbJ0MMSIewG6OHq",
  //   profilePicture: "",
  //   coverPicture: "",
  //   followers: ["65c9c8e7ef55a838b00bbd82"],
  //   followings: [],
  //   isAdmin: false,
  //   createdAt: { $date: { $numberLong: "1707718196129" } },
  //   updatedAt: { $date: { $numberLong: "1707820287363" } },
  //   __v: { $numberInt: "0" },
  // },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider value={{ user: state.user, isFetching: state.isFetching, error: state.error, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
