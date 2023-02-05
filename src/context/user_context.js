import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [myUser, setMyUser] = useState();

  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } =
    useAuth0();

  useEffect(() => {
    console.log("user : ", user);
    console.log("isAuthenticated : ", isAuthenticated);
    console.log("isLoading : ", isLoading);
    console.log(loginWithRedirect);
  }, [isAuthenticated]);

  return (
    <UserContext.Provider value={{ loginWithRedirect, myUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
