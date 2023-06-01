import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

import axios from "axios";
import { useToast ,ToastProvider,Box} from "@chakra-ui/react";
import { LOGIN } from "../routes/routes";

export default function Register() {
  const toast = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({name:"",email: "", password: "" });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:4000/api/auth/register",
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
  
      const json=await response.json();
      if(response.ok){
        console.log(json);
        toast({
            title: "Register Success",
            description: "You are successfully registered",
            status: "success",
            duration: 3000,
            position:"top",
            isClosable: true,
            });
            navigate("/login");
      }
     
   
   
    } catch (error) {
      console.error(error);
        toast({
            title: "Register Failed",
            description: "Please check your credentials",
            status: "error",
            duration: 3000,
            isClosable: true,
            });

     
    }
   
  };
  return (
    <>


   
      <div className="container">
        <div className="login-form">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}> <input
              type="text"
              placeholder="username"
              name="name"
              onChange={onChange}
              required
            />
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
            <button type="submit">Register</button>
          </form>
        </div>
      </div> 
    </>

  );
}
