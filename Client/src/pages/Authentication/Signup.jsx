import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../../store/slice/user/user.thunk";
import toast from "react-hot-toast";
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const handleInputChange = (event) => {
    setSignupData((prevData) => {
      return { ...prevData, [event.target.name]: event.target.value };
    });
  };

  const handleRegister = async () => {
    if (signupData.password !== signupData.confirmPassword) {
      return toast.error("Password and Confirm Password must be same");
    }
    const response = await dispatch(registerUserThunk(signupData));
    if (response?.payload?.success) {
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-[40rem] w-full flex flex-col gap-5 bg-base-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Please Signup...</h2>

        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaUser />
          <input
            onChange={handleInputChange}
            type="text"
            className="grow"
            name="fullName"
            placeholder="Full Name"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaUser />
          <input
            onChange={handleInputChange}
            type="text"
            className="grow"
            name="username"
            placeholder="Username"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 w-full">
          <RiLockPasswordLine />

          <input
            onChange={handleInputChange}
            type="password"
            className="grow"
            name="password"
            placeholder="Enter Password"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <RiLockPasswordLine />

          <input
            onChange={handleInputChange}
            type="password"
            className="grow"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
        </label>

        <div className="flex gap-5 mt-1">
          <label
            htmlFor="male"
            className="flex gap-2 items-center cursor-pointer"
          >
            <input
              onChange={handleInputChange}
              id="male"
              type="radio"
              name="gender"
              value={"male"}
              className="radio radio-primary"
            />
            Male
          </label>
          <label
            htmlFor="female"
            className="flex gap-2 items-center cursor-pointer"
          >
            <input
              onChange={handleInputChange}
              id="female"
              value={"female"}
              type="radio"
              name="gender"
              className="radio radio-primary"
            />
            Female
          </label>
        </div>

        <button onClick={handleRegister} className="btn btn-primary">
          Signup
        </button>
        <p>
          Already have an account ? &nbsp;
          <Link to="/login">
            <span className="text-primary text-semibold">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
