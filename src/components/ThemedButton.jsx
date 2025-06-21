import React, { useContext } from 'react';
import { ThemeContext } from "../contexts/ThemeContext"; // استيراد الـ Context
import Button from './ui/Button';

function ThemedButton() {
  // 3. استهلاك Context باستخدام useContext
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Button text={`Theme: (${theme})`} onClick={toggleTheme} />
  );
}

export default ThemedButton;
