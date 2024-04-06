import React from "react";

const Message = ({ self, children }) => {
  return (
    <div className={`w-full flex ${self === true ? "justify-end" : "justify-start"}`}>
      <div className="p-2 bg-grays-100 rounded-full px-4 flex items-center justify-center">{children}</div>
    </div>
  );
};

export default Message;
