import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Login/AuthContext";

function FormRegisterDefault() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notValid, setValid] = useState(false);

  const formRef = useRef();
  const { setLogin } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    if (confirmPassword === "" || e.target.value === confirmPassword) {
      setValid(false);
    } else if (e.target.value !== confirmPassword) {
      setValid(true);
    }
    setPassword(e.target.value);
  }

  function handleChangePassword(e) {
    const newValue = e.target.value;
    if (newValue === "" || newValue === password) {
      setValid(false);
    } else if (newValue !== password) {
      setValid(true);
    }
    setConfirmPassword(newValue);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (confirmPassword === password && confirmPassword !== "") {
      const userRegister = {
        email: formRef.current.email.value,
        password: formRef.current.password.value,
      };
      await axios
        .post("http://localhost:5000/api/register", userRegister)
        .then((response) => {
          if (response.data["success"]) {
            console.log("Register successfull!!!");
            setLogin(response.data);
            navigate("/");
          } else {
            console.log(
              "Register failed!!!, Error: ",
              response.data["message"]
            );
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
          navigate("/login");
        });
    } else {
      console.log("Error Valid");
      navigate("/login");
    }
  }

  return (
    <>
      <form className="form-data" onSubmit={handleSubmit} ref={formRef}>
        <div className="mb-3 mx-3 font-page">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address:
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Email"
          />
          <div id="emailHelp" className="form-text change-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3 mx-3 font-page">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 mx-3 font-page">
          <label className="form-label">Confirm Password:</label>
          <input
            type="password"
            className="form-control"
            name="confirm-password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleChangePassword}
            required
          />
          {notValid && (
            <label className="form-label not-valid mb-0 mt-2">
              Please make sure your password match.
            </label>
          )}
        </div>
        <div className="d-flex justify-content-center mt-4">
          <button
            type="submit"
            className="btn btn-dark"
            style={{ paddingLeft: "148px", paddingRight: "148px" }}
          >
            REGISTER
          </button>
        </div>
      </form>
    </>
  );
}
export default FormRegisterDefault;
