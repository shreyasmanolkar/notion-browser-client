import Register from "./pages/register";
import LogIn from "./pages/log-in";
// import NotFound from "./pages/not-found";
import Workspace from "./pages/workspace";
import "./styles/_main.scss";
import CreateWorkspacePanel from "./components/create-workspace-panel";
import LoginPanel from "./components/login-panel";

function App() {
  return (
    <div className="App">
      {/* <h1>Notion-Clone</h1> */}
      {/* <Register /> */}
      {/* <LogIn /> */}
      {/* <NotFound /> */}
      <Workspace />
      {/* <CreateWorkspacePanel /> */}
    </div>
  );
}

export default App;
