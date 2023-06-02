import React from "react";

import styles from './ColorOption.module.scss';

interface IColorOptionProps {
  color: string;
  selectedColor: string;
  onChangeColor: (color: string) => void;
}

const ColorOption: React.FC<IColorOptionProps> = ({
  color,
  selectedColor,
  onChangeColor,
}) => {
  const handleChangeColor = () => onChangeColor(color);

  return (
    <div
      className={styles.option}
      onClick={handleChangeColor}
      style={{ background: color }}
    >
      {selectedColor === color && (
        <i className="fas fa-check"></i>
      )}
    </div>
  );
}

export default ColorOption;