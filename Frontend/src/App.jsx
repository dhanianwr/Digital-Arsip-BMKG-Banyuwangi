import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./layout/Layout";
import ScanDokumen from "./pages/ScanDokumen";
import DashboardPages from "./pages/Dashboard";
import { LoginPage } from "./auth/LoginPage";
import { RegisterPage } from "./auth/RegisterPage";
import PDFPage from "./pages/PDFPage";
import WordPage from "./pages/WordPage";
import ExcelPage from "./pages/ExcelPage";
import PowerPage from "./pages/PPT";
import { EditDoc } from "./pages/EditDoc";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPages />} />
            <Route path="scan-dokumen" element={<ScanDokumen />} />
            <Route path="pdf-page" element={<PDFPage />} />
            <Route path="word-page" element={<WordPage />} />
            <Route path="excel-page" element={<ExcelPage />} />
            <Route path="ppt-page" element={<PowerPage />} />
            <Route path="/edit/:id" element={<EditDoc />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </>
  );
}
