import axios from "axios";
import React, { useLayoutEffect, useState, useCallback } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import ImageDrawer from "./components/ImageDrawer/ImageDrawer";
import ContentArea from "./components/ContentArea/ContentArea";
import { Context } from "./contexts/Context";
import { ImageObject } from "./types/types";
import styles from "./App.module.css";

export const App: React.FC = () => {
    const [data, setData] = useState<ImageObject[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("animal");
    const [selectedImage, setSelectedImage] = useState<ImageObject>(null);
    const [imageList, setImageList] = useState<ImageObject[]>([]);

    const handleSetSelectedCategory = useCallback((category: string) => {
        setSelectedCategory(category);
    }, []);

    const handleSetSelectedImage = useCallback((image: ImageObject) => {
        setSelectedImage((prev) => {
            if (prev && prev.metadata[0].value === image.metadata[0].value) {
                return prev;
            } else {
                return image;
            }
        });
    }, []);
    // console.log(imageList)
    // console.log(data)

    const handleSetImageList = useCallback(
        (imageList: ImageObject[] | string) => {
            setImageList((prev) => {
                // return origin data when change category in sidebar
                if (
                    typeof imageList === "string" &&
                    imageList === "origin data"
                ) {
                    // console.log(typeof imageList === "string" &&
                    // imageList === "origin data")
                    // console.log(data)
                    return data;
                } else if (Array.isArray(imageList)) {
                    if (prev && prev.length === imageList.length) {
                        let isChanged = true;
                        for (let i = 0; i < imageList.length; i++) {
                            const image = imageList[i];
                            const prevImage = prev[i];

                            if (image.id === prevImage.id) {
                                isChanged = false;
                            }
                        }
                        return isChanged ? imageList : prev;
                    } else {
                        return imageList;
                    }
                }
            });
        },
        [data]
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
