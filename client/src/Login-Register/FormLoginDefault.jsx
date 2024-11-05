import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Login/AuthContext";

function FormLoginDefault() {
  const formRef = useRef();
  const { login } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const userLogin = {
      email: formRef.current.email.value,
      password: formRef.current.password.value,
    };
    const result = await login(userLogin);
    if (result) {
      navigate("/user");
    } else {
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
          />
        </div>
        <div className="d-flex justify-content-center mt-4">
          <button
            type="submit"
            className="btn btn-dark"
            style={{ paddingLeft: "158px", paddingRight: "158px" }}
          >
            LOGIN
          </button>
        </div>
      </form>
    </>
  );
}

export default FormLoginDefault;
