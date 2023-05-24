import React from 'react';

import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  const hours = Array(24)
    .fill(0)
    .map((_, index) => index);

  return (
    <div className={styles.time_scale}>
      {hours.map((hour) => {
        const formattedHour = hour.toString().padStart(2, '0');
        return (
          <div
            className={styles.time_slot}
            key={hour}
          >
            <span className={styles.time_slot_time}>
              {hour > 0 && `${formattedHour}:00`}
            </span>
          </div>
        )
      })}
    </div>
  );
};

export default Sidebar;
