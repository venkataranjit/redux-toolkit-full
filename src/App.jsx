import { Container } from "react-bootstrap";
import "./App.css";
import NavBar from "./Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Hobbies from "./Hobbies";
import Teachers from "./Teachers";
import Students from "./Students";

function App() {
  return (
    <>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hobbies" element={<Hobbies />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
