import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Restaurants from "./pages/Restaurants/Restaurants";
import Menu from "./pages/Menu/Menu";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </>
  );
}

export default App;