import React, { useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

export default function AddEvent() {
  const toast = useToast();
  const userid=localStorage.getItem('user_id')
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    pricing: 0,
    organizer: userid,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
     
      const response = await fetch(
        "http://localhost:4000/api/event/add/",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify(formData),
        }
      );
      const { data } = response;
      
      if(response.ok){
        console.log(data);
        toast({
            title: "Event Added",
            description: "You are successfully added event",
            status: "success",
            duration: 3000,
            position: "top",
            isClosable: true,
          });
      }
      else{
        toast({
            title: "Event Added Failed",
            description: "Please check your credentials",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
      }
     
    } catch (error) {
      console.log(error);
      toast({
        title: "Event Added Failed",
        description: "Please check your credentials",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Box
      maxW="400px"
      mx="auto"
      p="20px"
      bg="#f5f5f5"
      borderRadius="5px"
      boxShadow="0 2px 5px rgba(0, 0, 0, 0.1)"
    >
      <h1>Add Event</h1>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="title">Title:</FormLabel>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="description">Description:</FormLabel>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="location">Location:</FormLabel>
          <Input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="date">Date:</FormLabel>
          <Input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="time">Time:</FormLabel>
          <Input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="pricing">Pricing:</FormLabel>
          <Input
            type="number"
            step="0.01"
            id="pricing"
            name="pricing"
            value={formData.pricing}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="organizer">Organizer:</FormLabel>
          <Input
            type="text"
            id="organizer"
            name="organizer"
            value={formData.organizer}
            onChange={handleChange}
            required
          />
        </FormControl>

        <Button type="submit" mt="20px" colorScheme="blue">
          Add Event
        </Button>
      </form>
    </Box>
  );
}
