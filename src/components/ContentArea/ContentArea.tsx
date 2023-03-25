import React, { useCallback } from "react";
import { ImageObject } from "../../types/types";
import styles from "./ContentArea.module.css";

interface Props {
    selectedImage: ImageObject;
}

const ContentArea: React.FC<Props> = ({ selectedImage }) => {
    console.log('render content area')

    const handleZoomImage = useCallback(() => {
        const imageDrawerElement = document.querySelector('div[class *= "app"] div[class *= "imageDrawer"]') as HTMLElement
        const contentAreaElement = document.querySelector('div[class *= "app"] div[class *= "displayedContentArea"]') as HTMLElement

        if (imageDrawerElement && contentAreaElement) {
            setTimeout(() => {
                imageDrawerElement.style.display = 'none'
            }, 500)

            if (window.innerWidth > 600) {
                imageDrawerElement.classList.remove('mobile-hidden')
                imageDrawerElement.classList.remove('mobile-show')
                contentAreaElement.classList.remove('mobile-zoom-in')
                contentAreaElement.classList.remove('mobile-zoom-out')                

                imageDrawerElement.classList.add('hidden');
                imageDrawerElement.classList.remove('show');
                contentAreaElement.classList.add('zoom-in')
                contentAreaElement.classList.remove('zoom-out')
            } else {
                imageDrawerElement.classList.remove('hidden');
                imageDrawerElement.classList.remove('show');
                contentAreaElement.classList.remove('zoom-in')
                contentAreaElement.classList.remove('zoom-out')

                imageDrawerElement.classList.add('mobile-hidden')
                imageDrawerElement.classList.remove('mobile-show')
                contentAreaElement.classList.add('mobile-zoom-in')
                contentAreaElement.classList.remove('mobile-zoom-out')
            }
        }
    }, [])

    return selectedImage ? (
        <div className={styles.displayedContentArea}>
            <div 
                className={styles.displayedImage} 
                style={{
                    backgroundImage: `url(${selectedImage.metadata[0].value})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#CFDAE2'                            
                }}                
                onClick={handleZoomImage}
            ></div>
            <span className={styles.displayedDescription}>
                {selectedImage.description}
            </span>
        </div>
    ) : (
        <div className={styles.placeholderContentArea}>
            <div className={styles.placeholderImage}></div>
            <span className={styles.placeholderDescription}>
                Select the Photo
            </span>
        </div>
    );
};

export default ContentArea;
