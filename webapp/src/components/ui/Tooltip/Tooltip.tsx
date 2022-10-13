import React, { FC, ReactNode, useState } from "react";
import s from "./Tooltip.module.scss";

interface ITooltipProps {
  children: ReactNode | ReactNode[];
  text: string;
  direction?: "top" | "bottom";
}

const Tooltip: FC<ITooltipProps> = ({ children, text, direction = "bottom" }) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <div className={s.container} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
      <div className={s.content}>{children}</div>
      {showTooltip && <span className={`${s.tooltip} ${direction === "bottom" ? s.tooltipBottom : s.tooltipTop}`}>{text}</span>}
    </div>
  );
};

export default Tooltip;
