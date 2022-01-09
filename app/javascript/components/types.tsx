type Tag = string;

export type Todo = {
    id: number;
    name: string;
    details: string;
    is_done: boolean;
    tags: Tag[];
};

export type SearchQuery = {
    tags: Tag[];
    text: string;
};
