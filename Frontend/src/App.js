import "./App.css";
import User from "./components/User";
import Update from "./components/update";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="main">
        <h2 className="main-header">Credit Card Processing Task</h2>
        <User />
      </div>
    </Router>
  );
}

export default App;
