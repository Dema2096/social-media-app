import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/main/main';
import Login from './pages/login';
import Navbar from './components/navbar';
import CreatePost from './pages/create-post/create-post';



function App() {
  return (
    <div className="text-center bg-cover bg-fixed h-max min-h-[100vh] sm:w-full" style={{backgroundImage: `url(${require("./background/abstract-digital-grid-black-background.jpg")})`}}>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/createpost' element={<CreatePost/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
