import { BrowserRouter } from "react-router-dom";

import { NavBar } from "./modules/NavBar/NavBar.module";
import { AppRouter } from "./modules/AppRouter/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="flex place-content-center ">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
