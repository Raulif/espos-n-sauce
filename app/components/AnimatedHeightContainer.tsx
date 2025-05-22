export const AnimatedHeightContainer = ({
  show,
  children,
  classes,
}: {
  show: boolean;
  children: React.ReactNode;
  classes?: string;
}) => (
  <div className={`animated-height-outer ${show ? "show" : ""}`}>
    <div className={`animated-height-inner ${classes || ""}`}>{children}</div>
  </div>
);
