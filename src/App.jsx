import { useState } from "react";
import "./App.css";
import Table from "./component/Table";
import DragDrop from "./component/DragDrop";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="m-8 space-y-5">
        <div>
          <Table></Table>
        </div>
        <div>
          <DragDrop></DragDrop>
        </div>
      </div>
    </>
  );
}

export default App;
