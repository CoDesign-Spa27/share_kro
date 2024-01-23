import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/logo.png";
import loginCover from "../assets/logincover.svg";
import { jwtDecode } from "jwt-decode";
import { client } from "../client";

const Login = () => {
 const navigate=useNavigate();

  const responseGoogle = (response) => {
    //  console.table(response)
  const { credential } = response
   const stringToken=   String(credential)
    const schemaResponse = typeof stringToken === 'string' ? jwtDecode(stringToken) : null;
     localStorage.setItem('user', JSON.stringify(schemaResponse));
     
     // Assuming you have a user object inside the credential, adjust accordingly
     const { name, azp, picture } = schemaResponse;
     const doc={
       _id: azp,
      _type: 'user',  
      username: name,
      image: picture
     }
     client.createIfNotExists(doc).then(()=>{
    navigate('/',{replace: true})

     })
     

  };
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Left side with SVG */}
      <div className="hidden md:flex items-center justify-center bg-[#00afb9]">
        {/* Add your SVG here */}

        <img className="text-white h-96  w-96" src={loginCover} alt="" />
      </div>

      {/* Right side with login form */}
      <div className="flex   flex-col items-center justify-center p-8">
        <div className="mb-8 flex items-center">
          {/* Logo, header, etc. */}

          <img
            className=" sm:h-36 sm:w-36 h-24 w-24 rounded-md  mx-1"
            src={logo}
            alt="Logo"
          />
        </div>

        <GoogleLogin      
        
        // clientId={REACT_APP_GOOGLE_API_TOKEN}
          render={(renderProps) => (
            <button
              type="button"
              className="bg-[#00afb9] sm:text-[1.7rem]  text-white sm:px-5 sm:py-3 px-4 py-2 rounded"
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
  );
};

export default Login;
