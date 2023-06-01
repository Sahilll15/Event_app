import { useState } from "react";
import { ROOT } from "../routes/routes";
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react';

export function useLogin() {
    const toast = useToast();
    const host = `http://localhost:4000`;
    const navigate = useNavigate();

    const [isLoading, setLoading] = useState(false)
    const [formData, setFormData] = useState({ email: "", password: "" })

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const login = async () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 3000)

        try {
            const response = await fetch(`${host}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    formData
                }),
            });
            const data = await response.json()

            console.log(data)


            if (response.ok) {
                console.log("login")
                navigate(ROOT)
                toast({
                    title: "Login Successful",
                    description: "You have successfully logged in",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })

            } else {
                console.log("Invalid Credentials")
                toast({
                    title: "Login Failed",
                    description: "Invalid Credentials",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })

            }
        } catch (error) {
            console.log(error)
            toast({
                title: "Login Failed",
                description: "Invalid Credentials",
                status: "error",
                duration: 9000,
                isClosable: true,

            })
        }
        setLoading(false);

    }

    return { login, onChange, formData, isLoading };

}