import WelcomeView from './screens/WelcomeView';
import RegisterView from './screens/RegisterView';
import { Routes, Route} from "react-router-dom";
import NavBar from "./components/Surfaces/NavBar"
import "./App.scss"

function App() {
  return (
    <div className='app-container'>
      <div className='nav-container'>
        <NavBar/>
      </div>

      <Routes>
        <Route path='/' element={<WelcomeView />}></Route>
        <Route path='/register' element={<RegisterView />} >
        </Route>
      </Routes>
    </div>
  );
};

export default App;
