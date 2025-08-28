"use client";
import React from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  "aria-label"?: string;
}

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
    href?: never;
  };

type ButtonAsLink = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "a";
    href: string;
    target?: string;
    rel?: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");

export const Button: React.FC<ButtonProps> = ({
  as = "button",
  variant = "primary",
  size = "md",
  block = false,
  loading = false,
  leftIcon,
  rightIcon,
  className,
  children,
  ...rest
}) => {
  const content = (
    <>
      {loading ? (
        <span className={styles.spinner} aria-hidden />
      ) : (
        leftIcon && <span className={styles.iconLeft}>{leftIcon}</span>
      )}
      <span>{children}</span>
      {!loading && rightIcon && (
        <span className={styles.iconRight}>{rightIcon}</span>
      )}
    </>
  );

  const classNames = cx(
    styles.button,
    styles[variant],
    styles[size],
    block && styles.block,
    className
  );

  if (as === "a") {
    const props = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        {...props}
        className={classNames}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          props.onKeyDown?.(e);
          if (e.key === "Enter" || e.key === " ") {
            (e.currentTarget as HTMLAnchorElement).click();
          }
        }}
        aria-busy={loading}
      >
        {content}
      </a>
    );
  }

  const props = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      {...props}
      className={classNames}
      disabled={loading || props.disabled}
      aria-busy={loading}
    >
      {content}
    </button>
  );
};
