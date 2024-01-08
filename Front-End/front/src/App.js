import logo from './logo.svg';
import './App.css';
import { useAuthContext } from "./hooks/useAuthContext.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const { admin } = useAuthContext();
  return (
    <div className="App">
     <BrowserRouter>
<Routes>

<Route path="/" element={<HomePage />}></Route>
<Route path='/Categories' element={<Categoriespage />}></Route>

<Route path= "/admin" element={<AdminPage />}></Route>
        <Route
          path="/category"
          element={admin || value ? <Category /> : <Navigate to="/admin" />}
        ></Route>
        <Route
          path="/product"
          element={admin || value ? <Product /> : <Navigate to="/admin" />}
        ></Route>

</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
