export interface ImageObject {
    id: string;
    name: string;
    category: string;
    description: string;
    metadata: {
        value: string;
    }[];
}

export type ImageListAction = {
    type: 'origin data' | 'new data';
    payload: ImageObject[];
}
