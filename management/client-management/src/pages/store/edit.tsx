import React, { useEffect, useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import FormEditProduct2 from "../../components/common/FormEditProduct2";

const StoreProductEdit = () => {
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
        if (!propertyImage.name) return alert("Please upload a product image");

        await onFinish({
            ...data,
            hinhanh: propertyImage.url,
            nhaphang: insertValue,
        });
    };
    return (
        <FormEditProduct2
            type="Edit"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            handleImageChange={handleImageChange}
            onFinishHandler={onFinishHandler}
            image={propertyImage}
            insertNumber={setInsertValue}
            exportNumber={() => {}}
            conlai={productData?.slkho}
        />
    );
};

export default StoreProductEdit;
