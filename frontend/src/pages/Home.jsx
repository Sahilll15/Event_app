import React, { useEffect, useState } from 'react'
import EventCard from '../components/Eventcard'
import { Flex,Grid,Box,Heading, Center }from '@chakra-ui/react';
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { SearchIcon } from '@chakra-ui/icons'


export default function Home({}) {
  const userId=localStorage.getItem('user_id')
  const [events,setEvent]=useState([]);
  const [search,setSearch]=useState('')

  const handleOnchange=(e)=>{
    setSearch(e.target.value)

  }
  
  const handlesearch=(query)=>{
    if(search.trim()=== ""){
    window.location.reload()
    }
    console.log(search)
    const filteredEvents=events.filter((event)=>{
      return event.title.toLowerCase().includes(search.toLowerCase())
    })
    setEvent(filteredEvents)
    
      }


  useEffect(()=>{
    
    const getEvents=async()=>{
      const response=await fetch("http://localhost:4000/api/event/get",{
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
      </Heading>
      <Box  marginLeft="10" display="inline-block" mr="4">
                    <InputGroup size="lg">
                        <Input
                            type="text"
                            placeholder="Search..."
                            size="lg"
                            px="50"
                            py="1/"
                            borderRadius="lg"
                            onChange={handleOnchange}
                            value={search}
                            _focus={{
                                boxShadow: "outline",
                            }}
                        />
                        <InputRightElement>
                            <SearchIcon color="gray.500" onClick={handlesearch} onMouseEnter={handlesearch}/>
                        </InputRightElement>
                    </InputGroup>

                </Box></Center>
     
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        {events.map((event) => (
          <EventCard key={event._id} event={event}  />
        ))}
      </Grid>
    </Box>
</div>
  )
}

