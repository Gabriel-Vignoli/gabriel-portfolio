import gsap from "gsap";
import Dock from "./components/dock";
import Navbar from "./components/navbar";
import Welcome from "./components/welcome";

import { Draggable } from "gsap/Draggable";
import Terminal from "./components/windows/terminal";
import Safari from "./components/windows/safari";
import Resume from "./components/windows/resume";
import Finder from "./components/windows/finder";
import Text from "./components/windows/text";
import Image from "./components/windows/image";
import Contact from "./components/windows/contact";
gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar></Navbar>
      <Welcome></Welcome>
      <Dock></Dock>

      <Terminal></Terminal>
      <Safari></Safari>
      <Resume></Resume>
      <Finder></Finder>
      <Text></Text>
      <Image></Image>
      <Contact></Contact>
    </main>
  );
};

export default App;
