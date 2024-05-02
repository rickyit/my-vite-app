import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import TodoPage from "./pages/TodoPage";
import MembersPage from "./pages/MembersPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./ProtectedRoutes";
import RedirectIfLoggedIn from "./RedirectIfLoggedIn";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <AboutPage />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <ContactPage />
            </Layout>
          }
        />
        <Route
          path="/members"
          element={
            <Layout>
              <MembersPage />
            </Layout>
          }
        />
        <Route
          path="/todo"
          element={
            <Layout>
              <TodoPage />
            </Layout>
          }
        />
      </Route>

      <Route element={<RedirectIfLoggedIn />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
