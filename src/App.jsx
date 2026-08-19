import gsap from "gsap";
import Dock from "./components/dock";
import Navbar from "./components/navbar";
import Welcome from "./components/welcome";

import { Draggable } from "gsap/Draggable";
import Terminal from "./components/windows/terminal";
import Safari from "./components/windows/safari";
import Resume from "./components/windows/resume";
gsap.registerPlugin(Draggable)

const App = () => {
  return ( 
    <main>
      <Navbar></Navbar>
      <Welcome></Welcome>
      <Dock></Dock>

      <Terminal></Terminal>
      <Safari></Safari>
      <Resume></Resume>
    </main>
   );
}
 
export default App;