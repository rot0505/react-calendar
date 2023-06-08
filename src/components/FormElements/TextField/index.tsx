import { forwardRef, MouseEvent, useImperativeHandle, useRef } from "react";

import { IFieldProps } from "../types";
import styles from "./TextField.module.scss";

const TextField = forwardRef<HTMLInputElement, IFieldProps>(
  ({ error, type = "text", style, isShowError = true, fullWidth = false, onClick, ...rest }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current!, [inputRef]);

    const handleClick = (e: any) => {
      inputRef.current!.focus();
      onClick?.(e);
    };

    const onClickInput = (e: MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();
      onClick?.(e);
    };

    return (
      <div className={`${styles.text_field_container} ${fullWidth && styles.text_field_container_full}`} style={style}>
        <div className={styles.text_field_input} onClick={handleClick}>
          <input
            {...rest}
            className={`${styles.text_field} ${fullWidth && styles.text_field_full} ${
              !!error && styles.text_field_error
            } ${rest.className}`}
            type={type}
            ref={inputRef}
            onClick={onClickInput}
          />
          <div className={styles.bottom_line}></div>
        </div>
        {error && isShowError && <div className={styles.text_field_error_text}>{error}</div>}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
