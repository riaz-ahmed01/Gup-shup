import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../store/slice/user/user.thunk";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  const handleInputChange = (event) => {
    // console.log(event.target.name, event.target.value);
    setLoginData((prevData) => {
      return { ...prevData, [event.target.name]: event.target.value };
    });
  };

  const handleLogin = async () => {
    if (!loginData.username || !loginData.password) {
      return toast.error("Please enter username and password");
    }
    const response = await dispatch(loginUserThunk(loginData));
    if (response?.payload?.success) {
      navigate("/");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-[40rem] w-full flex flex-col gap-5 bg-base-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Please Login...</h2>

        <label className="input input-bordered border-none flex items-center gap-2 w-full">
          <FaUser />
          <input
            type="text"
            name="username"
            className="grow"
            placeholder="Username"
            onChange={handleInputChange}
          />
        </label>

        <label className="input input-bordered border-none flex items-center gap-2 w-full">
          <RiLockPasswordLine />
          <input
            type="password"
            name="password"
            className="grow"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
        </label>

        <button onClick={handleLogin} className="btn btn-primary w-full">
          Login
        </button>

        <p>
          Don't have an account? &nbsp;
          <Link to="/signup">
            <span className="text-primary text-semibold">Signup</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
