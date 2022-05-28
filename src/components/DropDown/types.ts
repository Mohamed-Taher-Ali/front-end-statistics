export interface DropDownProps<T> {
    items: T[];
    title?: string;
    titleColor?: string;
    selectedValue?: string;
    onSelect?: (item: T) => void;
}

export interface DropDownItemProps {
    id: number;
    value: string;
}

export interface DropDownPropsWithName<T> extends DropDownProps<T> {
    name: string;
}

export interface DropDownsListProps<T> {
    titleColor?: string;
    dropDowns: DropDownPropsWithName<T>[];
    onSelect?: (name: string, item: T) => void;
}