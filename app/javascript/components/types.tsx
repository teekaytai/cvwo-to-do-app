type Tag = string;

export type Todo = {
    id: number;
    name: string;
    details: string;
    category: string;
    is_done: boolean;
    tags: Tag[];
};
