import "./app.css";
import Card from "./components/card";
import { createStore, Provider as JotaiProvider } from "jotai";

// Nope, not THAT AppStore, Jotai Store of this app :)
const appStore = createStore();

function App() {
  return (
    <JotaiProvider store={appStore}>
      <Card />
    </JotaiProvider>
  );
}

export default App;
