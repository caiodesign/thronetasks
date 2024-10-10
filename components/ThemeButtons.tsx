"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  MdDarkMode,
  MdOutlineDarkMode,
  MdLightMode,
  MdOutlineLightMode,
} from "react-icons/md";

export function ThemeButtons({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  const { setTheme, theme } = useTheme();

  return (
    <div className={`flex ${className}`}>
      <span className="mr-2 cursor-pointer" onClick={() => setTheme("light")}>
        {theme === "light" ? (
          <MdLightMode size={size} />
        ) : (
          <MdOutlineLightMode size={size} />
        )}
      </span>
      <span className="cursor-pointer" onClick={() => setTheme("dark")}>
        {theme === "light" ? (
          <MdOutlineDarkMode size={size} />
        ) : (
          <MdDarkMode size={size} />
        )}
      </span>
    </div>
  );
}
