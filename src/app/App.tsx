import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "app/Layout/Layout";
import AuthGate from "features/auth/AuthGate/AuthGate";
import Dashboard from "features/claims/dashboard/Dashboard";
import Statistics from "features/statistics/Statistics";
import NewClaim from "features/claims/newClaim/NewClaim";
import ClaimDetails from "features/claims/claimDetails/ClaimDetails";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <AuthGate>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/claims/new" element={<NewClaim />} />
            <Route path="/claims/:id" element={<ClaimDetails />} />
          </Route>
        </Routes>
      </AuthGate>
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
