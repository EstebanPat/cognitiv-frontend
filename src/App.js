import logo from './logo.svg';
import './App.css';
import WelcomeView from './screens/WelcomeView';
import SignUp from './components/Auth/SignUp/SignUp';

function App() {
  return (
    <WelcomeView />
    <div className='App'>
      <SignUp></SignUp>
    </div>
  );
};

export default App;
