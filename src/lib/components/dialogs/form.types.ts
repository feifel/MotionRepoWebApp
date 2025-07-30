// form.types.ts
export interface Row {
    id: string;
    type: 'number' | 'text' | 'textarea' | 'enum' | 'tags' ;
    label: string;
    values: string[];
    options?: string[];
}
