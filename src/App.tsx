import Register from "./pages/register";
import LogIn from "./pages/log-in";
import NotFound from "./pages/not-found";
import "./styles/_main.scss";

function App() {
  return (
    <div className="App">
      {/* <h1>Notion-Clone</h1> */}
      <Register />
      <LogIn />
      <NotFound />
    </div>
  );
}

export default App;
