import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { stopPrevent } from "../../utils/eventModifier";
import styles from "./commandList.module.scss";
import { ThemeContext } from "../../../context/ThemeContext";

interface CommandListProps {
  items: any[];
  command: (...args: any[]) => any;
}

export const CommandList = React.forwardRef(
  ({ items, command }: CommandListProps, ref) => {
    const { theme } = useContext(ThemeContext);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setSelectedIndex(0);
    }, [items]);

    useEffect(() => {
      scrollSelectedItemIntoView();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedIndex]);

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

    const scrollSelectedItemIntoView = () => {
      const container = scrollContainerRef.current;
      const selectedItem = container?.querySelector(
        // `.${styles.item}:nth-child(${selectedIndex + 1})`
        `.${styles.item}:nth-child(${selectedIndex + 2})`
      );

      if (container && selectedItem) {
        const containerRect = container.getBoundingClientRect();
        const selectedItemRect = selectedItem.getBoundingClientRect();

        if (selectedItemRect.bottom > containerRect.bottom) {
          // Scroll down
          container.scrollTop += selectedItemRect.bottom - containerRect.bottom;
        } else if (selectedItemRect.top < containerRect.top) {
          // Scroll up
          container.scrollTop -= containerRect.top - selectedItemRect.top;
        }
      }
    };

    return (
      <div
        className={`${styles.items} ${styles[theme]}`}
        ref={scrollContainerRef}
      >
        <div className={`${styles.bubble_menu_dropdown}`}>Basic blocks</div>
        {items.length ? (
          <>
            {items.map((item, index) => {
              return (
                <div
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
                  tabIndex={0}
                >
                  <img src={item.img} alt="Text" width="48" height="48" />
                  <div className={`${styles.info}`}>
                    <div className={`${styles.title}`}>{item.title}</div>
                    <div className={`${styles.description}`}>{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className={`${styles.item}`}>
            <div className={`${styles.no_result}`}>No result</div>
          </div>
        )}
      </div>
    );
  }
);
