import React, { useEffect } from "react";

import Calendar from "pages/Calendar";
import { useActions } from "./hooks";

const App: React.FC = () => {
  const { getEvents } = useActions();

  useEffect(() => {
    getEvents();
  }, []);

  return <Calendar />;
};

export default App;
