
export interface ICategory {
    id: number;
    category1: string;
    category2: string;
    category3: string;
    url: string;
    url_encode: string;
    parent_category: string;
    url_site: string;
    status: string; // IGNORE;DONE;TODO
    created_at: Date;
    updated_at: Date;
}
