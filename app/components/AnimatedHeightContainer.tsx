export const AnimatedHeightContainer = ({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) => (
  <div className={`animated-height-outer ${show ? "show" : ""}`}>
    <div className="animated-height-inner">{children}</div>
  </div>
);
