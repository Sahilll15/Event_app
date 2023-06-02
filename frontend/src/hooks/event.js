import { useState } from "react"

import { useToast } from "@chakra-ui/react"


export function useDelete() {
    const [isLoading, setisLoading] = useState(false);
    const toast = useToast();
    const host = `http://localhost:4000`;

    const deleteEvent = async (id) => {
        setisLoading(true);
        try {
            const response = fetch(`${host}/api/event/delete/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("auth-token"),
                    },

                })

            // Display success toast message
            toast({
                title: 'Event deleted',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error(error);
            // Display error toast message
            toast({
                title: 'Error deleting event',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setisLoading(false);
        }
    };
    return { deleteEvent, isLoading };
}

export function useUpdate() {
    const [isLoading, setisLoading] = useState(false);
    const toast = useToast();
    const host = `http://localhost:4000`;

    const updateEvent = async (id, eventData) => {
        try {


            const response = fetch(`${host}/api/event/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token"),
                },
                body: JSON.stringify(eventData),
            })


            // Check if the response was successful
            if (!response.ok) {
                toast({
                    title: 'Event updated',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error(error);
            // Display error toast message
            toast({
                title: 'Error updating event',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setisLoading(false);
        }
    };

    return { updateEvent, isLoading };
}
