import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import FetchProducts from './components/FetchProducts'
import AddProducts from './components/AddProducts'
import EditProducts from './components/EditProducts'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<FetchProducts />}></Route>
        <Route path="/Add" element={<AddProducts />}></Route>
        <Route path="/Edit/:id" element={<EditProducts />}></Route>



      </Routes>
   
    </>
  )
}

export default App
