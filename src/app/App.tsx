import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "app/Layout/Layout";
import Dashboard from "features/claims/dashboard/Dashboard";
import Statistics from "features/statistics/Statistics";
import NewClaim from "features/claims/newClaim/NewClaim";
import ClaimDetails from "features/claims/claimDetails/ClaimDetails";
import { useLookupsStore } from "features/claims/lookups/useLookupsStore";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    useLookupsStore.getState().fetchLookups();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/claims/new" element={<NewClaim />} />
          <Route path="/claims/:id" element={<ClaimDetails />} />
        </Route>
      </Routes>
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
