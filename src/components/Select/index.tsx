import React, { useRef, useState } from "react";

import { useClickOutside } from "hooks/useClickOutside";
import SelectOption from "./SelectOption";
import { IModes } from "types/date";
import styles from "./Select.module.scss";

interface SelectProps {
  options: string[];
  onChangeOption: (option: IModes) => void;
  selectedOption: string;
}

const Select: React.FC<SelectProps> = ({ options, onChangeOption, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectContainerRef = useRef<HTMLDivElement>(null);

  const toggling = () => setIsOpen(!isOpen);

  const close = () => setIsOpen(false);

  useClickOutside(selectContainerRef, close);

  return (
    <div className={styles.select_container} ref={selectContainerRef}>
      <div className={`${styles.select_header} button`} onClick={toggling}>
        <div className={styles.select_header_title}>{selectedOption}</div>
        <i className={`${styles.select_icon_down} fas fa-chevron-down`}></i>
      </div>
      {isOpen && (
        <div className={styles.select_list_container}>
          <ul className={styles.select_list}>
            {options.map((option) => (
              <SelectOption key={option} option={option} onChangeOption={onChangeOption} close={close} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
