import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./routes/Home.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Profile from "./routes/Profile.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>
);
