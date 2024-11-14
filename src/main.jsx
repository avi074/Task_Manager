import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import taskStore from "./utils/taskStore.js";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={taskStore}>
    <App />
  </Provider>,
);
