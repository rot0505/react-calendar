import React, { useRef, useState } from "react";
import { colors } from "./colors";
import { useClickOutside } from "hooks/index";
import ColorOption from "./ColorOption";

import styles from './ColorPicker.module.scss';

interface IColorPickerProps {
  selectedColor: string;
  onChangeColor: (color: string) => void
}

const ColorPicker: React.FC<IColorPickerProps> = ({
  selectedColor,
  onChangeColor
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const toggling = () => setIsOpen(!isOpen);

  const close = () => setIsOpen(false);

  useClickOutside(colorPickerRef, close);

  return (
    <div className={styles.color_picker} ref={colorPickerRef}>
      <div className={styles.color_picker_header} onClick={toggling}>
        <div
          className={styles.color_picker_selected_color}
          style={{ background: selectedColor }}
        />
        <i className={`fas fa-chevron-down ${styles.color_picker_icon_down}`}></i>
      </div>
      {isOpen && (
        <ul className={styles.color_picker_list}>
          {colors.map((color, indx) => (
            <ColorOption
              key={indx}
              color={color}
              selectedColor={selectedColor}
              onChangeColor={onChangeColor}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ColorPicker;