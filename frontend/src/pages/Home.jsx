import React, { useEffect, useState } from 'react'
import EventCard from '../components/Eventcard'

export default function Home({}) {
  const [events,setEvent]=useState([]);
  
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
    <h2>Events</h2>
    {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
  </div>

  )
}

{/* <h1>{event.title}</h1>
<p>{event.description}</p>
<p>{event.location}</p>
<p>{event.date}</p>
<p>{event.time}</p>
<p>{event.pricing}</p>
<p>{event.organizer}</p> */}