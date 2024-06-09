import React, { useEffect, useState } from "react";
import FormEditProduct from "../../components/common/FormEditProduct";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import { X } from "@mui/icons-material";

export const ProductEdit = () => {
    const [exportValue, setExportValue] = useState(0);
    const [insertValue, setInsertValue] = useState(0);

    const {
        refineCore: { onFinish, formLoading, queryResult },
        register,
        handleSubmit,
    } = useForm();
    const productData = queryResult?.data?.data;
    const [propertyImage, setPropertyImage] = useState({
        name: productData?.ten,
        url: productData?.hinhanh,
    });

    useEffect(() => {
        if (productData) {
            setPropertyImage({
                name: productData.ten || "",
                url: productData.hinhanh || "",
            });
        }
    }, [productData]);

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
        if (!propertyImage.name) return alert("Please upload a product images");

        if (exportValue > data.soluong)
            return alert("Xuất kho vượt quá số lượng");
        await onFinish({
            ...data,
            hinhanh: propertyImage.url,
            nhapkho: insertValue,
            xuatkho: exportValue,
        });
    };
    return (
        <FormEditProduct
            type="Edit"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            handleImageChange={handleImageChange}
            onFinishHandler={onFinishHandler}
            image={propertyImage}
            insertNumber={setInsertValue}
            exportNumber={setExportValue}
        />
    );
};
