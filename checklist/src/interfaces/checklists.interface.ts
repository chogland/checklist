export interface ChecklistItem {
    id: number;
    name: string;
    checked: boolean;
}

export interface Checklist {
    id: number;
    name: string;
    category: string;
    items: ChecklistItem[];
    subcategories: string[];
}