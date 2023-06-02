import React, { useEffect, useState } from 'react'
import EventCard from '../components/Eventcard'
import { Flex,Grid,Box,Heading, Center }from '@chakra-ui/react';

export default function Myevents({}) {
  const [events,setEvent]=useState([]);
  const userId=localStorage.getItem('user_id')
  useEffect(()=>{
    const getEvents=async()=>{
        console.log(userId)
      const response=await fetch(`http://localhost:4000/api/event/getuser/${userId}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "auth-token":localStorage.getItem("auth-token"),
        },

      });
      const data=await response.json();
      if(response.ok){
        setEvent(data.events);
        console.log(data);
      }
      
    }
    getEvents();
  },[])
  return (
    <div>
   <Box p={4}>
    <Center>  <Heading as="h1" mb={4} fontSize="75" color="teal.700">
        Events
      </Heading></Center>
    
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
      {events && events.length > 0 ? (
  events.map((event) => <EventCard key={event._id} event={event} loggedInUser={userId} />)
) : (
    <Center>  <Heading as="h1" mb={4} fontSize="75" color="black.700">
        No Events...
      </Heading></Center>
)}


      </Grid>
    </Box>
</div>
  )
}
