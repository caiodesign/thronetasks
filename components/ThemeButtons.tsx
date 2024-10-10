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
      <a
        className="mr-2"
        href="javascript:void(0)"
        onClick={() => setTheme("light")}
      >
        {theme === "light" ? (
          <MdLightMode size={size} />
        ) : (
          <MdOutlineLightMode size={size} />
        )}
      </a>
      <a href="javascript:void(0)" onClick={() => setTheme("dark")}>
        {theme === "light" ? (
          <MdOutlineDarkMode size={size} />
        ) : (
          <MdDarkMode size={size} />
        )}
      </a>
    </div>
  );
}
