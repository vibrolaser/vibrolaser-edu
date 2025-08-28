"use client";

import React from "react";
import styles from "./GradientShapes.module.css";

interface ReviewsGradientProps {
  style?: React.CSSProperties;
}

export const ReviewsGradient: React.FC<ReviewsGradientProps> = ({ style }) => {
  return (
    <div className={styles.reviewsGradient} style={style} aria-hidden="true" />
  );
};
