import React, { useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues, Form } from "react-hook-form";
import FormStaff from "../../components/common/FormStaff";
import { useGetIdentity } from "@refinedev/core";
import { isQuanLy } from "../../utils/validateRole";
import { Indent } from "../../interfaces/common";

const StaffCreate = () => {
    const [productImage, setPropertyImage] = useState({ name: "", url: "" });

    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
    } = useForm();

    const onFinishHandler = async (data: FieldValues) => {
        await onFinish({
            ...data,
            hinhanh: productImage.url,
        });
    };

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

    const { data: user } = useGetIdentity<Indent>();
    const right = isQuanLy(user?.vaitro);

    return (
        <FormStaff
            type="Create"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            onFinishHandler={onFinishHandler}
            image={productImage}
            vaitro=""
            handleImageChange={handleImageChange}
            right={right}
        />
    );
};

export default StaffCreate;
