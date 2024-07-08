import Home from "./components/Home"
import Login from "./components/login"
import { Route, Routes } from "react-router-dom"
function App() {
  return (
    <>
       
       
       <Routes>
        
       <Route  Route index element={<Login />} />
       <Route path="/home" element={<Home/>} />
         
          
      </Routes>
    </>
  )
}

export default App
