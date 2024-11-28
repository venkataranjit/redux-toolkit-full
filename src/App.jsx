import { Container } from "react-bootstrap";
import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Teachers from "./pages/Teachers";
import Students from "./pages/Students";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
