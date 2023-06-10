import Register from "./pages/register";
import LogIn from "./pages/log-in";
import "./styles/_main.scss";

function App() {
  return (
    <div className="App">
      {/* <h1>Notion-Clone</h1> */}
      <Register />
      <LogIn />
    </div>
  );
}

export default App;
