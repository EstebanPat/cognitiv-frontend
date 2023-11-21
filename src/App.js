import "./App.scss"
import Dashboard from "./screens/Admin/Dashboard";
import WelcomeView from "./screens/guest/WelcomeView"; 


function App() {
  return (
    <div className="app-container">
      <WelcomeView></WelcomeView>
    </div> 
  );
};

export default App;
