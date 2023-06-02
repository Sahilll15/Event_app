import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { Box, Heading, Text, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input } from '@chakra-ui/react';
import {useDelete,useUpdate}  from '../hooks/event';
import { useState } from 'react';

const EventCard = ({ event,loggedInUser }) => {
  const isEventCreatedByUser = event.organizer === loggedInUser;
  const  { deleteEvent, isLoading }= useDelete();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedEvent,setEditedEvent]=useState(event);
  const { updateEvent }=useUpdate();
  
  const handledelete=()=>{
    deleteEvent(event._id)
    window.location.reload();
  }


  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };
  const handleInputChange = (e) => {
    setEditedEvent({ ...editedEvent, [e.target.name]: e.target.value });
  };


  const handledit=()=>{
    setIsEditModalOpen(true);
    console.log(editedEvent)
  }

  const handleUpdateEvent = () => {
    updateEvent(event._id,editedEvent);
    setIsEditModalOpen(false);
    
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      p="4"
      mb="4"
    >
      <Heading as="h3" size="md" mb="2">
        {event.title}
      </Heading>

      <Text fontSize="sm" mb="2">
        {event.description}
      </Text>

      <Text fontSize="sm" mb="2">
        Location: {event.location}
      </Text>

      <Text fontSize="sm" mb="2">
        Date: {event.date}
      </Text>

      <Text fontSize="sm" mb="2">
        Time: {event.time}
      </Text>

      <Text fontSize="sm" mb="2">
        Pricing: {event.pricing}
      </Text>

 
      <Button colorScheme='teal' size='lg'>
    Register
  </Button>

      {isEventCreatedByUser && (
        <>
          <DeleteIcon marginLeft={10} boxSize={5} mr="2" size="lg" onClick={handledelete}   cursor={isLoading ? 'not-allowed' : 'pointer'}
        opacity={isLoading ? 0.5 : 1} />
          <EditIcon marginLeft={2} boxSize={5} mr="2" size="lg" onClick={handledit}/>
        </>
      )}
 
 <Modal isOpen={isEditModalOpen} onClose={handleEditModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb="4">
              <FormLabel>Title</FormLabel>
              <Input name="title" value={editedEvent.title} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Description</FormLabel>
              <Input name="description" value={editedEvent.description} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Location</FormLabel>
              <Input name="location" value={editedEvent.location} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Date</FormLabel>
              <Input name="date" value={editedEvent.date} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Time</FormLabel>
              <Input name="time" value={editedEvent.time} onChange={handleInputChange} />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Pricing</FormLabel>
              <Input name="pricing" value={editedEvent.pricing} onChange={handleInputChange} />
            </FormControl>
            <Button colorScheme="teal" onClick={handleUpdateEvent}>
              Update Event
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
    
  );
};

export default EventCard;
