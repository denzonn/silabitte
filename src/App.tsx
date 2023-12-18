import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login'
import User from "./pages/user";
import Type from "./pages/type";
import Result from "./pages/result";
import Indicator from "./pages/indicator";
import Request from "./pages/request";
import axios from "axios";

const App = () => {
  axios.defaults.baseURL = "https://silabitte.elayanan.info";

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login/>} path="/"/>
        <Route element={<User/>} path="/user"/>
        <Route element={<Type/>} path="/type"/>
        <Route element={<Result/>} path="/result"/>
        <Route element={<Indicator/>} path="/indicator"/>
        <Route element={<Request/>} path="/request"/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
