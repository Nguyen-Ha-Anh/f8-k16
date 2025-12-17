import { useRef, useEffect, useState } from "react";
import "./App.css";
import Notion from "./Notion";
import Sidebar from "./Sidebar";

function App() {
  const sidebarRef = useRef(null);
  const isResizing = useRef(false);

  const sidebarWidth = useRef(240);
  const saveWidthRef = useRef(240);
  const mousePosition = useRef(0);
  const [isCollapsed, setIsCollapsed] = useState(false);

  
  // Resize
  const handleMouseDown = (e) => {
    if (isCollapsed) return
    isResizing.current = true;
    mousePosition.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isResizing.current) return;

    const distance = e.clientX - mousePosition.current;
    let newWidth = sidebarWidth.current + distance;

    if (newWidth < 150) newWidth = 150;
    if (newWidth > 400) newWidth = 400;

    sidebarWidth.current = newWidth;
    sidebarRef.current.style.width = `${newWidth}px`;

    mousePosition.current = e.clientX;
  };

  const handleMouseUp = () => {
    isResizing.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const collapse = () => {
    // console.log('collapse');
    
    saveWidthRef.current = sidebarWidth.current;
    sidebarWidth.current = 0;
    sidebarRef.current.style.width = "0px";
    // sidebarRef.current.style.overflow = 'hidden'
    setIsCollapsed(true)
  };

  const expand = () => {

    sidebarWidth.current = saveWidthRef.current;
    sidebarRef.current.style.width = `${sidebarWidth.current}px`;
    // sidebarRef.current.style.overflow = 'hidden'

    setIsCollapsed(false)
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        sidebarRef={sidebarRef}
        sidebarWidth={sidebarWidth}
        isResizing={isResizing}
        mousePosition={mousePosition}
        onMouseDown={handleMouseDown}
      />
      <Notion
        isCollapsed={isCollapsed}
        collapse={collapse}
        expand={expand}
      />
    </div>
  );
}


export default App;
