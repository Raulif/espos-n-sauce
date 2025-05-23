import React from "react";

export const AnimatedButton = ({
  children,
  animate,
  disabled,
  onClick,
  classes,
}: {
  children: React.ReactNode;
  animate: boolean;
  disabled: boolean;
  onClick: () => void;
  classes?: string;
}) => {
  return (
    <button
      className={`animated-button ${animate ? "animate" : ""} ${classes || ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      <div className="inner">{children}</div>
    </button>
  );
};
