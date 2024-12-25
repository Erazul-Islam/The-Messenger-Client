import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
}

// components/chat/types.ts
export interface Message {
  content: string;
  userId: string;
  createdAt: string;
  user: {
      name: string;
  };
}

export interface Group {
  id: string;
  name: string;
}

export interface ChatProps {
  id: string;
}
