import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>HOME PAGE</h1>} />
        <Route path="/courses" element={<h1>COURSES PAGE</h1>} />
      </Routes>
    </BrowserRouter>
  );
}