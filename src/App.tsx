import React from "react";
import "./App.css";
import List from "./List";

const getData = (n: number) => {
  let array = [];
  for (let i = 0; i < n; i++) array.push(i);
  return array;
};

function App() {
  const customComponent = (val: Array<any>, index: number) => {
    return <div className="custom-list-item">Item Number {val}</div>;
  };
  return (
    <div className="main">
      <List
        data={getData(100)}
        orientation="horizontal"
        isDragable
        component={customComponent}
      />
    </div>
  );
}

export default App;
