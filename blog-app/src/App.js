import './App.css';
import{ Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import { useState } from 'react';

function App() {

  return (
    <div className="container">
      <h3>Blog App</h3>
      <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/blog/:id' element={<Blog />} />
      </Routes>
    </div>
  );
}

export default App;
