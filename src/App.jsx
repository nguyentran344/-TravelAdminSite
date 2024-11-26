import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TourList from "./pages/tours/TourList";
import AddTour from "./pages/tours/AddTour";
import EditTour from "./pages/tours/EditTour";
// Import các components khác khi cần

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<TourList />} />
          <Route path="/tours" element={<TourList />} />
          <Route path="/tours/add" element={<AddTour />} />
          <Route path="/tours/edit/:id" element={<EditTour />} />
          {/* Thêm các routes khác khi cần */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
