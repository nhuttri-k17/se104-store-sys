import React from "react";

import { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import Form from "../../components/common/Form";

export const ProductCreate = () => {
    const [productImage, setPropertyImage] = useState({ name: "", url: "" });
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
    } = useForm();

    const handleImageChange = (file: File) => {
        const reader = (readFile: File) =>
            new Promise<string>((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.onload = () => resolve(fileReader.result as string);
                fileReader.readAsDataURL(readFile);
            });

        reader(file).then((result: string) =>
            setPropertyImage({ name: file?.name, url: result })
        );
    };

    const onFinishHandler = async (data: FieldValues) => {
        if (!productImage.name) return alert("Hãy chọn một hình ảnh");
        console.log(data);
        await onFinish({
            ...data,
            hinhanh: productImage.url,
        });
    };

    return (
        <Form
            type="Create"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            image={productImage}
            handleImageChange={handleImageChange}
            onFinishHandler={onFinishHandler}
            isDisabledType={true}
        />
    );
};
