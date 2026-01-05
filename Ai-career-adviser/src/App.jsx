import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/landing-page"
import Login from "./pages/login"; 
import About from "./pages/about"
import ServicesPage from "./pages/services"
import InnovateInitiativeForm from "./pages/info-form"
import CareerPath from "./pages/CareerPath";
 
function App() {
  
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<WelcomePage/>} />  
        <Route path="/info-form" element={<InnovateInitiativeForm/>} />   
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServicesPage />} />
       <Route path="/career-path" element={<CareerPath/>}></Route>
      </Routes>
      
    </Router>
    
  );
}

export default App;