import { ImageListAction, ImageObject } from "../types/types";

const imageListReducer = (
    prevState: ImageObject[],
    action: ImageListAction
) => {
    const newImageList = action.payload;

    if (action.type === "origin data") {
        return action.payload;
    } else if (action.type === "new data") {
        if (prevState && prevState.length === newImageList.length) {
            let isChanged = false;

            for (let i = 0; i < newImageList.length; i++) {
                const newImage = newImageList[i];
                const prevImage = prevState[i];

                if (newImage.id != prevImage.id) {
                    isChanged = true;
                    break;
                }
            }

            if (isChanged) return newImageList;
            else return prevState;
        } else {
            return newImageList;
        }
    }
};

export default imageListReducer;
