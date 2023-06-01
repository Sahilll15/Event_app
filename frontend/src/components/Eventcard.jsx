import { Box, Heading, Text } from '@chakra-ui/react';

const EventCard = ({ event }) => {
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
    </Box>
  );
};

export default EventCard;
