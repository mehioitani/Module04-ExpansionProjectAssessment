
import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { supplier: action.payload }; 

    case "LOGOUT":
      return { supplier: null };
    default:
      return state;
  }
};


export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    supplier: null, 
  });

  
  useEffect(() => {
    const supplier = JSON.parse(localStorage.getItem("supplier"));

    if (supplier) {
      dispatch({ type: "LOGIN", payload: supplier });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};


