import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login'
import User from "./pages/user";
import Type from "./pages/type";
import Indicator from "./pages/indicator";
import Request from "./pages/request";
import News from "./pages/news";
import axios from "axios";
import Dashboard from "./pages/dashboard";
import Policy from "./pages/policy";

const App = () => {
  axios.defaults.baseURL = "https://silabitte.elayanan.info";

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login/>} path="/"/>
        <Route element={<Dashboard/>} path="/dashboard"/>
        <Route element={<User/>} path="/user"/>
        <Route element={<Type/>} path="/type"/>
        <Route element={<Indicator/>} path="/indicator"/>
        <Route element={<Request/>} path="/request"/>
        <Route element={<News/>} path="/news"/>
        <Route element={<Policy/>} path="/policy"/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
