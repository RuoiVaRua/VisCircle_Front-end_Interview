import React, { useCallback, useLayoutEffect, useRef, useContext } from 'react'
import { Context } from "../../contexts/Context";
import styles from "./Sidebar.module.css";

interface Props {
    selectedCategory: string;
}

const Sidebar: React.FC<Props> = ({ selectedCategory }) => {  
    console.log('render sidebar')
    const { setSelectedCategory, setImageList } = useContext(Context);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const selectCategory = useCallback((event: React.MouseEvent<HTMLButtonElement>): void => {
        console.log('========= select category ', event.target)
        const target = event.target as HTMLElement
        const imageDrawerElement = document.querySelector('div[class *= "app"] div[class *= "imageDrawer"]') as HTMLElement
        const contentAreaElement = document.querySelector('div[class *= "app"] div[class *= "displayedContentArea"]') as HTMLElement      
        const currentSelectedSidebarItem = document.querySelector('.' + styles.selectedSidebarItem)

        setImageList('origin data')

        if (currentSelectedSidebarItem) {
            currentSelectedSidebarItem.className = styles.sidebarItem;
        }
        
        if (target.nodeName === 'BUTTON') {
            target.className = styles.selectedSidebarItem;
            setSelectedCategory(target.id)
        } else if (target.parentNode.nodeName === 'BUTTON') {
            (target.parentNode as HTMLElement).className = styles.selectedSidebarItem;
            setSelectedCategory((target.parentNode as HTMLElement).id)
        }

        if (imageDrawerElement && contentAreaElement) {
            setTimeout(() => {
                imageDrawerElement.style.display = 'flex'
            }, 500)
            if (window.innerWidth > 600) {
                imageDrawerElement.classList.remove('mobile-hidden')
                imageDrawerElement.classList.remove('mobile-show')
                contentAreaElement.classList.remove('mobile-zoom-in')
                contentAreaElement.classList.remove('mobile-zoom-out') 

                imageDrawerElement.classList.remove('hidden');
                imageDrawerElement.classList.add('show');
                contentAreaElement.classList.remove('zoom-in')
                contentAreaElement.classList.add('zoom-out')
            } else {
                imageDrawerElement.classList.remove('hidden');
                imageDrawerElement.classList.remove('show');
                contentAreaElement.classList.remove('zoom-in')
                contentAreaElement.classList.remove('zoom-out')

                imageDrawerElement.classList.remove('mobile-hidden')
                imageDrawerElement.classList.add('mobile-show')
                contentAreaElement.classList.remove('mobile-zoom-in')
                contentAreaElement.classList.add('mobile-zoom-out')
            }
        }         
    }, [setSelectedCategory])

    useLayoutEffect(() => {
        console.log('---------- useLayoutEffect')
        // category can change when searching in imageDrawer
        const currentSelectedSidebarItem = document.querySelector('.' + styles.selectedSidebarItem)

        if (sidebarRef.current?.childNodes?.length && currentSelectedSidebarItem) {
            for (const button of sidebarRef.current.childNodes) {
                if ((button as HTMLElement).id === selectedCategory) {
                    currentSelectedSidebarItem.setAttribute('class', styles.sidebarItem);
                    (button as HTMLElement).setAttribute('class', styles.selectedSidebarItem);
                }
            }
        }
    }, [sidebarRef, selectedCategory])
    
    return(
        <div className={styles.sidebar} ref={sidebarRef}>
            <button className={styles.selectedSidebarItem} onClick={selectCategory} id="animal">
                <img className={styles.itemImage} src="Animal.svg"></img>
                <span className={styles.itemLabel}>Animals</span>
            </button>
            <button className={styles.sidebarItem} onClick={selectCategory} id="architecture">
                <img className={styles.itemImage} src="Architecture.svg"></img>
                <span className={styles.itemLabel}>Architecture</span>
            </button>
            <button className={styles.sidebarItem} onClick={selectCategory} id="landscape">
                <img className={styles.itemImage} src="Image.svg"></img>
                <span className={styles.itemLabel}>Landscapes</span>
            </button>
            <button className={styles.sidebarItem} onClick={selectCategory} id="people">
                <img className={styles.itemImage} src="People.svg"></img>
                <span className={styles.itemLabel}>People</span>
            </button>
        </div>
    )
}

export default Sidebar