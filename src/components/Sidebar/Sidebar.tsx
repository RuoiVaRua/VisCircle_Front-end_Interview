import React, {
    useCallback,
    useLayoutEffect,
    useRef,
    useContext,
    memo,
} from "react";
import { Context } from "../../contexts/Context";
import toggleClasses from "../../utils/toggleClasses";
import styles from "./Sidebar.module.css";

interface Props {
    selectedCategory: string;
}

const Sidebar: React.FC<Props> = ({ selectedCategory }) => {
    const { setSelectedCategory, setImageList } = useContext(Context);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const sidebarCategories = useRef<string[]>([
        "animal",
        "architecture",
        "landscape",
        "people",
        "all",
    ]);

    const selectCategory = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>): void => {
            const target = event.target as HTMLElement;
            const currentSelectedSidebarItem = document.querySelector(
                "." + styles.selectedSidebarItem
            );

            if (currentSelectedSidebarItem) {
                currentSelectedSidebarItem.className = styles.sidebarItem;
            }

            if (target.nodeName === "BUTTON") {
                target.className = styles.selectedSidebarItem;
                setSelectedCategory(target.id);
            } else if (target.parentNode.nodeName === "BUTTON") {
                (target.parentNode as HTMLElement).className =
                    styles.selectedSidebarItem;
                setSelectedCategory((target.parentNode as HTMLElement).id);
            }

            setImageList("origin data");
            toggleClasses("flex");
        },
        [setSelectedCategory, setImageList]
    );

    useLayoutEffect(() => {
        // category can change when searching in imageDrawer
        const currentSelectedSidebarItem = document.querySelector(
            "." + styles.selectedSidebarItem
        );

        if (
            sidebarRef.current?.childNodes?.length &&
            currentSelectedSidebarItem
        ) {
            for (const button of sidebarRef.current.childNodes) {
                if ((button as HTMLElement).id === selectedCategory) {
                    currentSelectedSidebarItem.setAttribute(
                        "class",
                        styles.sidebarItem
                    );
                    (button as HTMLElement).setAttribute(
                        "class",
                        styles.selectedSidebarItem
                    );
                }
            }
        }
    }, [sidebarRef, selectedCategory]);

    return (
        <div
            className={styles.sidebar}
            ref={sidebarRef}
            title="Click on the items to select the corresponding picture category"
        >
            {sidebarCategories.current?.length &&
                sidebarCategories.current.map((value, index) => {
                    const imageName = value
                        .replace(value[0], value[0].toUpperCase())
                        .concat(".svg");
                    const title = value.replace(
                        value[0],
                        value[0].toUpperCase()
                    );

                    return (
                        <button
                            key={index}
                            className={
                                index === 0
                                    ? styles.selectedSidebarItem
                                    : styles.sidebarItem
                            }
                            onClick={selectCategory}
                            id={value}
                        >
                            <img
                                className={styles.itemImage}
                                src={imageName}
                                alt={value}
                            ></img>
                            <span className={styles.itemLabel}>
                                {["animal", "landscape"].includes(value)
                                    ? title + "s"
                                    : title}
                            </span>
                        </button>
                    );
                })}
        </div>
    );
};

export default memo(Sidebar);
