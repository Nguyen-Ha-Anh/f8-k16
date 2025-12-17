import React from "react";

export default function Notion({ isCollapsed, collapse, expand }) {

  return (
    <div className="flex-1 relative p-5">
      <button onClick={isCollapsed ? expand : collapse}>
        {isCollapsed ? "☰" : "«"}
      </button>
        <p>Notion</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem ab a
          laboriosam minima fugiat molestias? Aspernatur corporis odit
          voluptatum nam porro ipsum iusto hic praesentium temporibus id.
          Incidunt, aliquam iure?
        </p>
      </div>
  );
}
