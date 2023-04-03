import React, { useCallback, memo } from "react";
import { ImageObject } from "../../types/types";
import toggleClasses from "../../utils/toggleClasses";
import styles from "./ContentArea.module.css";

interface Props {
    selectedImage: ImageObject;
}

const ContentArea: React.FC<Props> = ({ selectedImage }) => {
    const handleZoomImage = useCallback(() => {
        toggleClasses("none");
    }, []);

    return selectedImage ? (
        <div
            className={styles.displayedContentArea}
            title="Click on the picture for a larger view"
        >
            <div
                className={styles.displayedImage}
                style={{
                    backgroundImage: `url(${selectedImage.metadata[0].value})`,
                }}
                onClick={handleZoomImage}
            ></div>
            <span className={styles.displayedDescription}>
                {selectedImage.description}
            </span>
        </div>
    ) : (
        <div className={styles.placeholderContentArea}>
            <div
                className={styles.placeholderImage}
                style={{
                    backgroundImage: 'url("Landscape.svg")',
                }}
            ></div>
            <span className={styles.placeholderDescription}>
                Select the Photo
            </span>
        </div>
    );
};

export default memo(ContentArea);
