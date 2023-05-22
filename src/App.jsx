import "./assets/CSS/app.css";
import { Route, Routes } from "react-router-dom";
import PathRoutes from "./helpers/Routes.helper";
import NavBar from "./components/NavBar/Index";
import Home from "./components/Home/Index";
import Merece from "./components/Merece";

function App() {
  return (
    <div className="App">
      {<NavBar />}
      <Routes>
        <Route path={PathRoutes.MERECE} element={<Merece />} />
        <Route path={PathRoutes.HOME} element={<Home />} />
      </Routes>
    </div>
  );
}
export default App;
