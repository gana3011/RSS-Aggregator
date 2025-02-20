import { Route, Routes } from "react-router-dom";
import VerifyEmail from "./components/VerifyEmail";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/verifyEmail/:token" element={<VerifyEmail />} />
        <Route path="/channelForm" element={<Home />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} /> 
      </Routes>
    </>
  )
}

export default App;
