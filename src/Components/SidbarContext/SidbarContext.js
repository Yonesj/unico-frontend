import { createContext } from "react";

const SidebarContext = createContext({
  isSidebarOpen: false,
  setIsSidebarOpen: () => {}
});

export default SidebarContext;
