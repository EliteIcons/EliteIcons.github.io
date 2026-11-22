import React, { forwardRef } from 'react';

export interface EliteIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

export const createEliteIcon = (iconName: string, iconNode: [string, Record<string, any>][]) => {
  const Component = forwardRef<SVGSVGElement, EliteIconProps>(
    ({ color = 'currentColor', size = 24, strokeWidth = 2, children, ...rest }, ref) => (
      <svg
        ref={ref}
        xmlns="http://w3.org"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...rest}
      >
        {iconNode.map(([tag, attrs], index) => React.createElement(tag, { key: index, ...attrs }))}
        {children}
      </svg>
    )
  );
  Component.displayName = iconName;
  return Component;
};
