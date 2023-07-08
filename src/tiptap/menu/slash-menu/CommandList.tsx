import React, { useEffect, useImperativeHandle, useState } from "react";
import { stopPrevent } from "../../utils/eventModifier";
import { Icon } from "@iconify/react";
import styles from "./commandList.module.scss";

interface CommandListProps {
  items: any[];
  command: (...args: any[]) => any;
}

export const CommandList = React.forwardRef(
  ({ items, command }: CommandListProps, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
      setSelectedIndex(0);
    }, [items]);

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: { event: KeyboardEvent }) => {
        if (event.key === "ArrowUp") {
          stopPrevent(event);
          upHandler();
          return true;
        }

        if (event.key === "ArrowDown") {
          stopPrevent(event);
          downHandler();
          return true;
        }

        if (event.key === "Enter") {
          stopPrevent(event);
          enterHandler();
          return true;
        }

        return false;
      },
    }));

    const upHandler = () => {
      setSelectedIndex((selectedIndex + items.length - 1) % items.length);
    };

    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % items.length);
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    const selectItem = (index: number) => {
      const item = items[index];

      if (item) setTimeout(() => command(item));
    };

    return (
      <div className={`${styles.items}`}>
        {items.length ? (
          <>
            {items.map((item, index) => {
              return (
                <button
                  type="button"
                  className={`
                  ${styles.item}
                  ${index === selectedIndex ? styles.is_selected : ""} 
                `}
                  key={item.title}
                  onClick={() => selectItem(index)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onKeyDown={(e) => {
                    e.code === "Enter" && selectItem(index);
                  }}
                >
                  <span className={`${styles.icon}`}>
                    <Icon icon={`${item.iconClass}`} />
                  </span>
                  <span
                    className={`${styles.label}`}
                    dangerouslySetInnerHTML={{
                      __html: item.highlightedTitle || item.title,
                    }}
                  />
                </button>
              );
            })}
          </>
        ) : (
          <div className={`${styles.item}`}> No result </div>
        )}
      </div>
    );
  }
);
