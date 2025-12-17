import React, { useEffect, useRef } from "react";

export default function Sidebar({
  sidebarRef,
  sidebarWidth,
  onMouseDown
}) {
  return (
    <div
      ref={sidebarRef}
      className="relative bg-gray-300 py-13 select-none overflow-hidden shrink-0"
      style={{ width: `${sidebarWidth.current}px`, minWidth: '0px' }}
    >
      Sidebar
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque, ipsum.</p>
      <div 
      onMouseDown={onMouseDown}
      className="absolute right-0 top-0 w-1 h-full cursor-col-resize" />
    </div>
  );
}

