import Register from "./pages/register";
import LogIn from "./pages/log-in";
import Workspace from "./pages/workspace";
import NotFound from "./pages/not-found";
import { Route, Routes } from "react-router-dom";
import PageBody from "./components/page-body";
import { useAppSelector } from "./app/hooks";
import "./styles/_main.scss";

function App() {
  const userInfo = useAppSelector((user) => user.user.userInfo);

  return (
    <Routes>
      {!userInfo ? <Route path="/login" element={<LogIn />} /> : ""}
      {!userInfo ? <Route path="/register" element={<Register />} /> : ""}
      {userInfo && (
        <Route path="/" element={<Workspace />}>
          <Route path=":pageReference" element={<PageBody />} />
        </Route>
      )}
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
