import ReactDOM from "react-dom/client";
import AppRoutes from "./AppRoutes.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <AppRoutes />
    <Toaster />
  </Router>
);
