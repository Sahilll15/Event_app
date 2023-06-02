import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { ChakraProvider } from '@chakra-ui/react';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import PrivateRoutes from './utils/PrivateRoutes';
import AddEvent from './pages/AddEvent';
import Navbar from './components/Navbar';
import Myevents from './pages/Myevents';

const App = () => {
  return (
    <ChakraProvider>
      <Navbar />
      <div className="App">
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route element={<Home />} path="/" exact />
              <Route element={<AddEvent />} path="/addevent" exact />

              <Route element={<Myevents />} path="/myevents" exact />
            </Route>
            <Route element={<Login />} path="/login" />

            <Route element={<Register />} path="/register" />
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  )
}

export default App