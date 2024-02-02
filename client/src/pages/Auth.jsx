import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { checkUser, createUser, googleLogin } from "../actions/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    picture: "",
  });

  const [isSignUp, setIsSignUp] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      try {
        const data = await createUser(formData);
        if (data === "User already exists.")
          return setAlertMessage("The email is already in use");
        if (data === "User Name already exists.")
          return setAlertMessage("The username already exists.");
        setFormData({
          email: "",
          userName: "",
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
          picture: "",
        });
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      setAlertMessage("Passwords don't match!");
    }
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await checkUser(formData);
      if (data === "User doesn't exist.")
        return setAlertMessage("User doesn't exist.");
      if (data === "Invalid credentials.")
        return setAlertMessage("Invalid credentials.");

      setFormData({
        email: "",
        userName: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        picture: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    const decodedUser = jwtDecode(credentialResponse.credential);

    try {
      const data = await googleLogin({
        email: decodedUser.email,
        userName: decodedUser.given_name,
        firstName: decodedUser.given_name,
        lastName: decodedUser?.family_name || "",
        picture: decodedUser.picture,
        password: decodedUser.jti,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  useEffect(() => {
    let intervalId;

    if (alertMessage.trim() !== "") {
      intervalId = setInterval(() => {
        setAlertMessage("");
      }, 4000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [alertMessage]);

  return (
    <div className=" flex justify-center items-center">
      {!isSignUp ? (
        <form
          className=" text-black flex flex-col gap-3 justify-center items-start font-kanit p-10 "
          onSubmit={(credentialResponse) => handleUserLogin(credentialResponse)}
        >
          <p
            className={` h-10 p-2 font-bold text-2xl text-red-700 ${
              alertMessage ? "fade-out" : ""
            }`}
          >
            {alertMessage}
          </p>

          <label
            htmlFor="userName"
            className=" text-lg text-text font-montserrat "
          >
            User Name:
          </label>
          <input
            type="text"
            className="appearance-none border border-gray-300  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500 rounded-lg"
            id="userName"
            value={formData.userName}
            placeholder="Name here..."
            onChange={handleChange}
          />
          <label
            htmlFor="password"
            className=" text-lg text-text font-montserrat"
          >
            Password:
          </label>
          <input
            type="password"
            className="appearance-none border border-gray-300  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500 rounded-lg"
            id="password"
            placeholder="Password here..."
            onChange={handleChange}
            value={formData.password}
          />
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={(error) => console.log(`this is error yeaht : ${error}`)}
            theme="filled_black"
            shape="pill"
          ></GoogleLogin>
          <div className="flex gap-2 justify-center items-baseline self-center pt-4">
            <button
              type="submit"
              className={`bg-primary hover:bg-teal-700 text-black font-bold py-2 px-4 rounded mr-2
              ${
                (formData.userName === "" && formData.password === "") ||
                formData.userName === "" ||
                formData.password === ""
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={
                (formData.userName === "" && formData.password === "") ||
                formData.userName === "" ||
                formData.password === ""
              }
            >
              LOGIN
            </button>
            <p
              className=" text-white font-bold py-2 px-4 rounded mr-2 hover:underline cursor-pointer"
              onClick={() => setIsSignUp(true)}
            >
              SIGN UP?
            </p>
          </div>
        </form>
      ) : (
        <form
          className=" text-black flex flex-col gap-3 justify-center items-start font-kanit p-10 "
          onSubmit={handleUserSubmit}
        >
          <p
            className={` h-10 p-2 font-bold text-2xl text-red-700 ${
              alertMessage ? "fade-out" : ""
            }`}
          >
            {alertMessage}
          </p>

          <div className=" flex gap-2 items-center">
            <label
              htmlFor="userName"
              className=" text-lg text-text font-montserrat"
            >
              Username:
            </label>
            <input
              type="text"
              className="appearance-none border border-gray-300  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500 rounded-lg"
              id="userName"
              placeholder="Username here..."
              onChange={handleChange}
              value={formData.userName}
            />
            <label
              htmlFor="email"
              className=" text-lg text-text font-montserrat"
            >
              Email:
            </label>
            <input
              type="email"
              className="appearance-none border border-gray-300  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500 rounded-lg"
              id="email"
              placeholder="Email here..."
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div className=" flex gap-2 items-center">
            <label
              htmlFor="firstName"
              className=" text-lg text-text font-montserrat"
            >
              First Name:
            </label>
            <input
              type="text"
              className="appearance-none border border-gray-300  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500 rounded-lg"
              id="firstName"
              placeholder="First name here..."
              onChange={handleChange}
              value={formData.firstName}
            />
            <label
              htmlFor="lastName"
              className=" text-lg text-text font-montserrat"
            >
              Last Name:
            </label>
            <input
              type="text"
              className="appearance-none border border-gray-300  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500 rounded-lg"
              id="lastName"
              placeholder="Last name here..."
              onChange={handleChange}
              value={formData.lastName}
            />
          </div>
          <div className=" flex gap-2 items-center">
            <label
              htmlFor="password"
              className=" text-lg text-text font-montserrat"
            >
              Password:
            </label>
            <input
              type="password"
              className="appearance-none border border-gray-300  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500 rounded-lg"
              id="password"
              placeholder="Password here..."
              onChange={handleChange}
              value={formData.password}
            />
            <label
              htmlFor="confirmPassword"
              className=" text-lg text-text font-montserrat"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              className="appearance-none border border-gray-300  py-2 px-4 leading-tight focus:outline-none focus:border-blue-500 rounded-lg"
              id="confirmPassword"
              placeholder="Confirm password..."
              onChange={handleChange}
              value={formData.confirmPassword}
            />
          </div>
          <div className="flex gap-2 justify-center items-baseline self-center pt-4">
            <button
              type="submit"
              className={`bg-primary hover:bg-teal-700 text-black font-bold py-2 px-4 rounded mr-2 ${
                !Object.entries(formData).every(
                  ([key, value]) => key === "picture" || value !== ""
                )
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={
                !Object.entries(formData).every(
                  ([key, value]) => key === "picture" || value !== ""
                )
              }
            >
              SIGN UP
            </button>
            <p
              className=" text-white font-bold py-2 px-4 rounded mr-2 hover:underline cursor-pointer"
              onClick={(prev) => setIsSignUp(!prev)}
            >
              LOGIN?
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default Auth;
