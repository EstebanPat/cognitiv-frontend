import "./App.scss"
import WelcomeView from "./screens/guest/WelcomeView";
import Experiences from "../src/screens/guest/Experiences"
import MembershipList from "./screens/MembsershipsList";

function App() {
  return (
    <div className="app-container">
      <MembershipList></MembershipList>
      {/* <WelcomeView></WelcomeView> */}
      {/* <Experiences></Experiences> */}
    </div> 
  );
};

export default App;
