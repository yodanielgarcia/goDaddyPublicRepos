import { HashRouter, Routes, Route } from "react-router-dom";
import DetailsPage from "../pages/DetailsPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

export default function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
}