import React from "react";
import { clsx } from 'clsx';

export default function Notification({
  logo,
  title,
  content,
  className = "",
  icon,
  iconClass = "",

}) {
  return (
    <div
      className={`
        absolute
        relative
        m-5
        w-[350px]
        bg-white
        rounded-xl
        shadow-md
        flex
        flex-col
        gap-2
        px-5
        py-2
        z-9999
        ${className}
      `}
    >
      <div className="flex justify-between items-center gap-2">
        {logo && <img src={logo} className="w-[58px] h-[15px]" alt="logo" />}
        <span className="text-sm text-gray-400">now</span>
      </div>
      <img src={icon} className={`absolute -top-3 left-5 ${iconClass}`} />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
}
