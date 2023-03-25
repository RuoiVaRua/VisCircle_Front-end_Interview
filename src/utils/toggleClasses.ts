function toggleClasses(displayState: string) {
    const imageDrawerElement = document.querySelector(
        'div[class *= "app"] div[class *= "imageDrawer"]'
    ) as HTMLElement;
    const contentAreaElement = document.querySelector(
        'div[class *= "app"] div[class *= "displayedContentArea"]'
    ) as HTMLElement;

    if (imageDrawerElement && contentAreaElement) {
        setTimeout(() => {
            imageDrawerElement.style.display = displayState;
        }, 500);
        const addMobile = window.innerWidth > 600 ? "" : "mobile-";
        const removeMobile = window.innerWidth > 600 ? "mobile-" : "";
        let removeOrAdd = "remove";
        let addOrRemove = "add";

        if (displayState === "none") {
            removeOrAdd = "add";
            addOrRemove = "remove";
        }

        imageDrawerElement.classList.remove(removeMobile + "hidden");
        imageDrawerElement.classList.remove(removeMobile + "show");
        contentAreaElement.classList.remove(removeMobile + "zoom-in");
        contentAreaElement.classList.remove(removeMobile + "zoom-out");

        imageDrawerElement.classList[removeOrAdd](addMobile + "hidden");
        imageDrawerElement.classList[addOrRemove](addMobile + "show");
        contentAreaElement.classList[removeOrAdd](addMobile + "zoom-in");
        contentAreaElement.classList[addOrRemove](addMobile + "zoom-out");
    }
}

export default toggleClasses;
