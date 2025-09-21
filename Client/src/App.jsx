import { useDispatch } from "react-redux";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { getUserProfileThunk } from "./store/slice/user/user.thunk";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getUserProfileThunk());
    })();
  }, []);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
