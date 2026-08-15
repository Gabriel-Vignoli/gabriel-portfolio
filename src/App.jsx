import Dock from "./components/dock";
import Navbar from "./components/navbar";
import Welcome from "./components/welcome";

const App = () => {
  return ( 
    <main>
      <Navbar></Navbar>
      <Welcome></Welcome>
      <Dock></Dock>
    </main>
   );
}
 
export default App;