import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Pagos from "../pages/Tesoreria/Pagos";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/tesoreria/pagos" element={<Pagos />} />
    </Routes>
  );
};

export default AppRoutes;
