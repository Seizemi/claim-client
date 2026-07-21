import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "app/Layout/Layout";
import Dashboard from "features/claims/dashboard/Dashboard";
import Statistics from "features/statistics/Statistics";
import NewClaim from "features/claims/newClaim/NewClaim";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/claims/new" element={<NewClaim />} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
