import { useSelector } from "react-redux";
import "./Login-Register.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function LoginRegister() {
  const isLog = useSelector((state) => state.formChange);

  return (
    <>
      <div className="container center">
        <div className="login-form">
          {isLog.logForm ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </>
  );
}
export default LoginRegister;
