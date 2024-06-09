import { BaseKey } from "@refinedev/core";

export interface FormFieldProp {
    title: string;
    labelName: string;
}

export interface FormValues {
    title: string;
    description: string;
    propertyType: string;
    location: string;
    price: number | undefined;
}

export interface PropertyCardProps {
    id?: BaseKey | undefined;
    ten: string;
    loai: string;
    soluong: string;
    gia: string;
    hinhanh: string;
    tinhtrang: string;
    type: string;
}
