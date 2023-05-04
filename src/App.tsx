import "./App.css";
import { AddCourse } from "./components/AddCourse";
import { Courses } from "./components/Courses";
import { Navbar } from "./components/Navbar";
import { SignUp } from "./components/SignUp";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex place-content-center ">
        <Courses />
      </div>
    </>
  );
}

export default App;
