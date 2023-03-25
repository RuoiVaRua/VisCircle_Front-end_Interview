import { createContext } from "react";
import { ImageObject } from "../types/types";

interface ContextType {
    setSelectedCategory: (newCategory: string) => void;
    setSelectedImage: (newImage: ImageObject) => void;
    setImageList: (newImageList: ImageObject[] | string) => void;
}

export const Context = createContext<ContextType>({
    setSelectedCategory: () => {},
    setSelectedImage: () => {},
    setImageList: () => {},
});
