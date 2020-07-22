import React, { useState, useEffect } from "react";
import "./App.scss";
import List from "./List";

const getData = (n: number) => {
  let array = [];
  for (let i = 0; i < n; i++) array.push(i);
  return array;
};
const listItemComponent = (val: Array<any>, index: number) => {
  return <div className="custom-list-item">Item Number {val}</div>;
};
const horizontalListItemComponent = (val: Array<any>, index: number) => {
  return <div className="custom-list-item">{val}</div>;
};

function App() {
  return (
    <div className="main">
      <List
        data={getData(100)}
        orientation="vertical"
        isDragable
        component={listItemComponent}
      />
      <List
        data={getData(100)}
        orientation="horizontal"
        isDragable
        component={horizontalListItemComponent}
      />
    </div>
  );
}

export default App;
