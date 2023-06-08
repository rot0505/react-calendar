import React from "react";

import styles from "./SelectOption.module.scss";
import { IModes } from "types/date";

interface ISelectOptionProps {
  option: string;
  close: () => void;
  onChangeOption: (option: IModes) => void;
}

const SelectOption: React.FC<ISelectOptionProps> = ({ option, close, onChangeOption }) => {
  const onOptionClicked = () => {
    close();
    onChangeOption(option as IModes);
  };

  return (
    <li className={styles.option} onClick={onOptionClicked}>
      <div className={styles.option_name}>{option}</div>
      <div className={styles.option_symbol}>{option.slice(0, 1)}</div>
    </li>
  );
};

export default SelectOption;
