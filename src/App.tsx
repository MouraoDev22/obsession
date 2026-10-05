import "./App.css";

import { OstData } from "./components/OstData";
import ostData from "./data/ost.json" with { type: "json" };

function App(): React.JSX.Element {
  console.log(ostData);

  return (
    <main>
      <OstData data={ostData} />
    </main>
  );
}

export default App;
