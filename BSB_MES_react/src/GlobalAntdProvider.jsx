import React, { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';

export function GlobalAntdProvider({ children }) {
  const [primaryColor, setPrimaryColor] = useState('#1677ff'); // default antd primary
  const [primaryHoverColor, setPrimaryHoverColor] = useState('#4096ff');

  useEffect(() => {
    // We wait for the next tick to ensure CSS is loaded and parsed
    setTimeout(() => {
      const computedStyle = getComputedStyle(document.documentElement);
      const primary = computedStyle.getPropertyValue('--color-primary').trim();
      const hover = computedStyle.getPropertyValue('--color-primary-hover').trim();

      if (primary) setPrimaryColor(primary);
      if (hover) setPrimaryHoverColor(hover);
    }, 0);
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColor,
        },
        components: {
          DatePicker: {
            activeBorderColor: primaryColor,
            hoverBorderColor: primaryColor,
            // Use activeShadow calculated by antd, or override
            activeShadow: `0 0 0 2px ${primaryColor}1a`, // roughly 10% opacity
          },
          Input: {
            activeBorderColor: primaryColor,
            hoverBorderColor: primaryHoverColor,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
