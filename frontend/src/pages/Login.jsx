import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import axios from "axios";
import { useToast ,ToastProvider,Box} from "@chakra-ui/react";
import Home from "./Home";
import { ROOT } from "../routes/routes";

export default function Login() {
  const toast = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
          formData
          ),
        }
      );
      const json =  await response.json();
    
      if(response.ok){
        console.log(json);
        console.log(json.user._id);
        localStorage.setItem("auth-token", json.token);
        localStorage.setItem("user_id", json.user._id);
        toast({
          title: "Login Success",
          description: "You are successfully logged in",
          status: "success",
          duration: 3000,
          position:"top",
          isClosable: true,
        });
        navigate("/");
      }else{
        toast({
          title: "Login Failed",
          description: "Please check your credentials",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
   
    } catch (error) {
      console.error(error);
      toast({
        title: "Login Failed",
        description: "Please check your credentials",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    console.log(formData);
  };
  return (
    <>


   
      <div className="container">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="user@gmail.com"
              name="email"
              onChange={onChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={onChange}
              required
            />
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div> 
    </>

  );
}
