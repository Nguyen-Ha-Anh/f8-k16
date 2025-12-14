import React, { useState } from "react";
import Content from "./component/Content";

function MountUnMount() {
  const [state, setState] = useState(true);

  return (
    <div>
      {state && <Content />}
      <button onClick={() => setState(!state)}>Toggle</button>
    </div>
  );
}

export default MountUnMount;

//Mounting: qua trinh duoc dua vao DOM
//Unmounting: Qua trinh component bi loai bo khoi DOM
//Mounted: dua vao
//UnMou: bi loai bo