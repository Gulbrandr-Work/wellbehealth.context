import { GlobalProvider } from "../context/GlobalContext";
import Screens from "./Screens";
import Headlines from "./shared/Headlines";
import Debug from "./utils/debug";
import Nav from "./nav/Nav";

function App() {
  return (
    <GlobalProvider>
      <div className="container m-auto max-w-5xl relative bg-white h-screen">
        <Debug />
        <Nav />
        <Headlines />
        <Screens />
      </div>
    </GlobalProvider>
  );
}

export default App;
