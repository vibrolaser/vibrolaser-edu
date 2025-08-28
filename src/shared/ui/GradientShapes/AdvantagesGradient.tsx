"use client";

import React from "react";
import styles from "./GradientShapes.module.css";

interface AdvantagesGradientProps {
  style?: React.CSSProperties;
}

export const AdvantagesGradient: React.FC<AdvantagesGradientProps> = ({
  style,
}) => {
  return (
    <div
      className={styles.advantagesGradient}
      style={style}
      aria-hidden="true"
    />
  );
};
