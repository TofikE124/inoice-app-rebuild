import React, { PropsWithChildren } from "react";
import Sidebar from "./Sidebar";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="overflow-hidden h-screen overflow-x-hidden bg-pale-ghost dark:bg-deep-space  dark-transition">
      <Sidebar />
      {children}
    </div>
  );
};

export default layout;
