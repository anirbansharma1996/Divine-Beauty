import './App.css';
import { AllRoutes } from './Routes';

import { Footer } from './components/footer';
import { Navbar } from './components/navbar';



function App() {
  return (
    <>
     <Navbar/>
       <AllRoutes/>
     <Footer/>
    </>
  );
}

export default App;
