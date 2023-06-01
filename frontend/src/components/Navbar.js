import React from 'react';
import { Box, Flex, Spacer, Link, Button, useDisclosure, IconButton, Collapse } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Navbar = () => {
    const { isOpen, onToggle } = useDisclosure();
    let isLoggedIn = localStorage.getItem('auth-token')
    const handleLogout = () => {
        localStorage.removeItem('auth-token')
        localStorage.removeItem('user_id')
        window.location.href = '/login'
    }
    return (
        <Box bg="gray.800" px={4}>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <Box>
                    <Link href="/" fontSize="xl" fontWeight="bold" color="white">My Website</Link>
                    <Link marginLeft={3} href="/" fontSize="xl" fontWeight="bold" color="white">Home</Link>

                    <Link marginLeft={3} href="/addevent" fontSize="xl" fontWeight="bold" color="white">Add Events</Link>


                </Box>

                {isLoggedIn ? (
                    // User is logged in, show the "Logout" link
                    <Link marginLeft={3} onClick={handleLogout} fontSize="xl" fontWeight="bold" color="white">
                        Logout
                    </Link>
                ) : (
                    // User is not logged in, show the "Login" link
                    <Link marginLeft={3} href="/register" fontSize="xl" fontWeight="bold" color="white">
                        Register
                    </Link>
                )}



                <IconButton
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    colorScheme="whiteAlpha"
                    aria-label="Menu"
                    display={{ md: 'none' }}
                    onClick={onToggle}
                />

                <Collapse in={isOpen} animateOpacity>
                    <Flex alignItems="center" justifyContent="space-between" flexBasis={{ sm: 'auto', md: 'full' }}>
                        <Box display={{ base: 'none', md: 'flex' }}>
                            <Link href="/about" mx={2} color="white">About</Link>
                            <Link href="/services" mx={2} color="white">Services</Link>
                            <Link href="/contact" mx={2} color="white">Contact</Link>
                        </Box>

                        <Spacer />

                        <Box display={{ base: 'none', md: 'flex' }}>
                            <Button colorScheme="whiteAlpha" mx={2}>Login</Button>
                            <Button colorScheme="teal" mx={2}>Sign Up</Button>
                        </Box>
                    </Flex>
                </Collapse>
            </Flex>
        </Box>
    );
};

export default Navbar;
