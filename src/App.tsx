import "./App.css";

import { Ost } from "./components/Ost";
import ostData from "./data/ost.json" with { type: "json" };

function App(): React.JSX.Element {
  return (
    <main>
      <Ost data={ostData} />
    </main>
  );
}

export default App;
