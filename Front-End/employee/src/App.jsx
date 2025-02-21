
import './App.css'
import EmployeeList from './Components/EmployeeList'
import FooterComponent from './Components/FooterComponent'
import HeaderComponent from './Components/HeaderComponent'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import AddEmployee from './Components/AddEmployee'
function App() {


  return (
    <>
    <BrowserRouter>
    <HeaderComponent/>
    <Routes> 
      <Route path="/" element={<EmployeeList/>}></Route> 
      <Route path="/employees" element={<EmployeeList/>}></Route> 
      <Route path="/add-employee" element={<AddEmployee/>}></Route>
      <Route path="/edit-employee/:id" element={<AddEmployee/>}></Route>
      
      </Routes>

    <FooterComponent/>
    </BrowserRouter>
    </>
  )
}

export default App
