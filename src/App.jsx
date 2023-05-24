import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/404"
import Login from "./pages/Login"
import MainLayout from "./components/layouts/MainLayout"
import Register from "./pages/Register"
import ForgotPassword from "./pages/ForgotPassword"
import ForgotPasswordCallback from "./pages/ForgotPasswordCallback"
import BackLayout from "./components/layouts/BackLayout"
import Profile from "./pages/Profile"
import Buy from "./pages/Buy"
import Download from "./pages/Download"
import Backoffice from "./pages/Backoffice"
import Forbidden from "./pages/Forbidden"

function App() {
  return (
    <>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={
            <MainLayout>
              <Home />
            </MainLayout>
          } />
          <Route path="/buy" element={
            <MainLayout>
              <Buy />
            </MainLayout>
          } />
          <Route path="/download" element={
            <MainLayout>
              <Download />
            </MainLayout>
          } />
          <Route path="/profile/:id" element={
            <MainLayout>
              <Profile />
            </MainLayout>
          } />
          <Route path="/login" element={
            <BackLayout>
              <Login />
            </BackLayout>
          } />
          <Route path="/register" element={
            <BackLayout>
              <Register />
            </BackLayout>} />
          <Route path="/forbidden" element={
            <BackLayout>
              <Forbidden />
            </BackLayout>
          } />
          <Route path="/forgot-password" element={
            <BackLayout>
              <ForgotPassword />
            </BackLayout>} />
          <Route path="/forgot-password/callback" element={
            <BackLayout>
              <ForgotPasswordCallback />
            </BackLayout>} />
          <Route path="/backoffice" element={
            <BackLayout>
              <Backoffice />
            </BackLayout>
          } />
          <Route path="*" element={
            <BackLayout>
              <NotFound />
            </BackLayout>
          } />
        </Routes>
      </div>
    </>
  )
}

export default App