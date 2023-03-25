export interface ImageObject {
    id: string;
    name: string;
    category: string;
    description: string;
    metadata: {
        value: string;
    }[];
}
