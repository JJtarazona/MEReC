import "./assets/CSS/app.css";
// Stylos

// Rutas
import { Route, Routes } from "react-router-dom";
import PathRoutes from "./helpers/Routes.helper";

// Componet
import Home from "./components/Home/Index";
import Merece from "./components/Merece";
import NavBar from "./components/NavBar/Index";
import Layout from "./components/Layout";
import DataTable from "./components/View/DataTable";

function App() {
  return (
    <div className="App">
      <Layout />
      <DataTable />

      {/* {<NavBar />} */}
      {/* <Routes>
        <Route path={PathRoutes.MERECE} element={<Merece />} />
        <Route path={PathRoutes.HOME} element={<Home />} />
      </Routes> */}
    </div>
  );
}
export default App;
