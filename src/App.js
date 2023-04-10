import React, { useState } from 'react';
import Header from './components/Header';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import AddMovie from './pages/AddMovie';
import Detail from './pages/Detail';
import { createContext } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';

const AppState = createContext()
function App() {

  const [login, setLogin] = useState(false)
  const [username, setUsername] = useState("")
  console.log(username);
  return (
    <AppState.Provider value={{login, setLogin, username, setUsername}}>
    <div className="App relative">
      <Router>
      <Header/>
      <Routes>
      
      <Route path='/' element={<Home/>}/>
      <Route path='/addMovie' element={<AddMovie/>}/>
      <Route path='/detail/:id' element={<Detail/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>


      </Routes>

      </Router>
    </div>
    </AppState.Provider>
  );
}

export default App;
export {AppState}