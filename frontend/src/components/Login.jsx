import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Lightlogo from "../assets/logo.png";
import Darklogo from "../assets/dark-logo.png";
import loginCover from "../assets/logincover.svg";
import { jwtDecode } from "jwt-decode";
import { client } from "../client";
import DarkMode from "./DarkMode";
import { useTheme } from "../contexts/ThemeContext";
import { getThemeLogo } from "../helpers/getThemeLogo";

const Login = () => {
  const { theme } = useTheme();

  const logoSrc = getThemeLogo(Lightlogo, Darklogo, theme);

  const navigate = useNavigate();
  const responseGoogle = (response) => {
    //  console.table(response)
    const { credential } = response;
    const stringToken = String(credential);
    const schemaResponse =
      typeof stringToken === "string" ? jwtDecode(stringToken) : null;
    localStorage.setItem("user", JSON.stringify(schemaResponse));

    // Assuming you have a user object inside the credential, adjust accordingly
    const { name, azp, picture } = schemaResponse;
    const doc = {
      _id: azp,
      _type: "user",
      username: name,
      image: picture,
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <>
      <div
        className="h-screen "
        style={{ color: theme === "light" ? "black" : "white" }}
      >
        <div className="flex flex-row py-2 justify-center sm:gap-[50%] gap-[30%] items-center">
          <div>
            <h1
              className="text-center  text-lg md:text-2xl lg:text-3xl py-5 font-black   
       leading-tight"
            >
              Share{" "}
              <span className="text-[#00afb9]  shadow-2xl bg-white py-1  px-2 rounded-xl md:rounded-2xl">
                Kro
              </span>
            </h1>
            </div>
            <div>
              <DarkMode />
            </div>
          
        </div>

        <h1
          className="text-center text-2xl md:text-3xl lg:text-5xl sm:py-11 p-8 font-black  
       leading-tight"
        >
          Your interest are <span className="text-[#00afb9] ">pinned</span>  here.
        </h1>
        <p className="leading-normal text-center   text-md md:text-xl lg:text-2xl  sm:mb-6 mb-2">
          Pin your moments, share your story !
        </p>
        <div className="grid grid-cols-1   md:grid-cols-2 ">
          {/* Left side with SVG */}
          <div className="hidden md:flex items-center justify-center ">
            {/* Add your SVG here */}

            <img className="text-white h-96  w-96" src={loginCover} alt="" />
          </div>

          {/* Right side with login form */}
          <div className="flex   flex-col items-center justify-center ">
            <div className="mb-8 flex items-center">
              {/* Logo, header, etc. */}

              <img
                className=" sm:h-36 sm:w-36 h-36 w-36 rounded-md  mx-1"
                src={logoSrc}
                alt="Logo"
              />
            </div>

            <GoogleLogin
 
              // clientId={REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-[#00afb9] "
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" />
                  Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
 
    <div class="my-20  md:my-5">
      
    <ul class="flex justify-center items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400  ">
        <li>
            <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
        </li>
        <li>
            <a href="#" class="hover:underline">Contact</a>
        </li>
    </ul>
    </div>
 
      </div>
    </>
  );
};

export default Login;
