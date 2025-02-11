import SignupForm from "./components/SignupForm";
import SigninForm from "./components/SigninForm";
import { Route, Routes } from "react-router-dom";
import VerifyEmail from "./components/VerifyEmail";
import Form from "./components/Form";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/verifyEmail/:token" element={<VerifyEmail />} />
        <Route path="/channelForm" element={<Form />} />
      </Routes>
    </>
  )
}

export default App;
