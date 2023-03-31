import axios from "axios";
import React, { useLayoutEffect, useState, useCallback } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import ImageDrawer from "./components/ImageDrawer/ImageDrawer";
import ContentArea from "./components/ContentArea/ContentArea";
import { Context } from "./contexts/Context";
import { ImageObject } from "./types/types";
import styles from "./App.module.css";
import toggleClasses from "./utils/toggleClasses";

export const App: React.FC = () => {
    const [data, setData] = useState<ImageObject[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("animal");
    const [selectedImage, setSelectedImage] = useState<ImageObject>(null);
    const [imageList, setImageList] = useState<ImageObject[]>([]);

    const handleSetSelectedCategory = useCallback(
        (category: string) => {
            if (selectedCategory !== category) {
                setSelectedCategory(category);
            }
        },
        [selectedCategory]
    );

    const handleSetSelectedImage = useCallback(
        (image: ImageObject) => {
            if (
                !selectedImage ||
                selectedImage.metadata[0].value != image.metadata[0].value
            ) {
                setSelectedImage(image);
            }
        },
        [selectedImage]
    );

    const handleSetImageList = useCallback(
        (newImageList: ImageObject[] | string) => {
            // return origin data when change category in sidebar
            if (
                typeof newImageList === "string" &&
                newImageList === "origin data"
            ) {
                setImageList([...data]);
            } else if (Array.isArray(newImageList)) {
                if (imageList && imageList.length === newImageList.length) {
                    let isChanged = false;
                    for (let i = 0; i < newImageList.length; i++) {
                        const newImage = newImageList[i];
                        const prevImage = imageList[i];

                        if (newImage.id != prevImage.id) {
                            isChanged = true;
                            break;
                        }
                    }

                    isChanged && setImageList(newImageList);
                } else {
                    setImageList(newImageList);
                }
            }
        },
        [imageList]
    );

    useLayoutEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://srv.3dcommerce.studio/public/shop/getProducts?shop=6412c8e785fad7b71567f17b"
                );

                if (
                    response.status === 200 &&
                    response.data.type === "success"
                ) {
                    const responseData = response.data.data;
                    const newImageList = [];

                    for (const imageObj of responseData) {
                        const newObj = {
                            id: imageObj.id,
                            name: imageObj.name,
                            category: imageObj.category,
                            description: imageObj.description,
                            metadata: [
                                {
                                    value: imageObj.metadata[0].value,
                                },
                            ],
                        };
                        newImageList.push(newObj);
                    }
                    setData(newImageList);
                    setImageList(newImageList);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

        const resizeHandler = () => toggleClasses("flex");

        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    return (
        <div className={styles.app}>
            <Context.Provider
                value={{
                    setSelectedCategory: handleSetSelectedCategory,
                    setSelectedImage: handleSetSelectedImage,
                    setImageList: handleSetImageList,
                }}
            >
                <Sidebar selectedCategory={selectedCategory}></Sidebar>
                <ImageDrawer
                    data={data}
                    selectedCategory={selectedCategory}
                    imageList={imageList}
                ></ImageDrawer>
                <ContentArea selectedImage={selectedImage}></ContentArea>
            </Context.Provider>
        </div>
    );
};
