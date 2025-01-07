import { useState } from "react";
import "./App.css";
import Table from "./component/Table";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1 className="text-7xl">hello word</h1>
        {/* table */}
        <div>
          <Table></Table>
        </div>
      </div>
    </>
  );
}

export default App;
