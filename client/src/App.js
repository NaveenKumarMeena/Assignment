import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Component/Login";
import DataProvider from "./context/DataProvider";
import Home from "./Component/Home";

function App() {
  return (
    <>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </>
  );
}

export default App;
