import React, { useState } from "react";
import FormStaff from "../../components/common/FormStaff";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import { useGetIdentity } from "@refinedev/core";
import { isQuanLy } from "../../utils/validateRole";

const StaffEdit = () => {
    const [productImage, setPropertyImage] = useState({ name: "", url: "" });
    const {
        refineCore: { onFinish, formLoading, queryResult },
        register,
        handleSubmit,
    } = useForm();
    const strategyData = queryResult?.data?.data;
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

    const { data: user } = useGetIdentity();
    const right = isQuanLy(user?.vaitro);

    return (
        <FormStaff
            type="Edit"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            onFinishHandler={onFinishHandler}
            iSEdit={true}
            id={strategyData?.id}
            image={productImage}
            handleImageChange={handleImageChange}
            vaitro={strategyData?.vaitro}
            right={right}
        />
    );
};

export default StaffEdit;
