import ReactDOM from "react-dom/client";
import AppRoutes from "./AppRoutes.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <AppRoutes />
  </Router>
);
