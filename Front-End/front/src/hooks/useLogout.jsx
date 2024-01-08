import { useAuthContext } from "./useAuthContext.jsx";

//no need to send a req to the server side when logging out we can: 1- update the global state, 2- delete the token from the localStorage
export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    //remove from storage
    localStorage.removeItem("supplier");

    //dispatch logout action
    dispatch({ type: "LOGOUT" });
  };


  return {logout}
};

export default useLogout;
