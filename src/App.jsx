import "./App.css";
import { Route, Routes } from "react-router-dom";
import PathRoutes from "./helpers/Routes.helper";
import NavBar from "./components/NavBar/Index";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={PathRoutes.MERECE} element={<NavBar />} />
        <Route path={PathRoutes.HOME} element={<NavBar />} />
      </Routes>
    </div>
  );
}
export default App;
