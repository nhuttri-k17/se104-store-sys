import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDelete, useGetIdentity, useTable } from "@refinedev/core";
import React, { useState } from "react";
import { CustomButton } from "../../components";
import { useNavigate } from "react-router-dom";
import { Edit, Delete, Add } from "@mui/icons-material";
import SmallButton from "../../components/common/SmallButton";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { escapeRegExp } from "@mui/x-data-grid/utils/utils";
import { format } from "date-fns";
import { isTiepThi } from "../../utils/validateRole";
import { Identifier } from "react-admin";
import { Indent } from "../../interfaces/common";

interface QuickSearchToolbarProps {
    clearSearch: () => void;
    onChange: () => void;
    value: string;
}

function QuickSearchToolbar(props: QuickSearchToolbarProps) {
    return (
        <div>
            <TextField
                fullWidth
                sx={{
                    width: "70%",
                    padding: "5px 10px",
                    borderRadius: "5px",
                }}
                size="medium"
                variant="standard"
                value={props.value}
                onChange={props.onChange}
                placeholder="Search…"
                InputProps={{
                    startAdornment: <SearchIcon fontSize="small" />,
                    endAdornment: (
                        <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{
                                visibility: props.value ? "visible" : "hidden",
                            }}
                            onClick={props.clearSearch}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>
                    ),
                }}
            />
        </div>
    );
}

const StrategyList = () => {
    const {
        tableQueryResult: { data, isLoading, isError },
    } = useTable();
    const navigate = useNavigate();
    const { mutate } = useDelete();
    const handleDeleteProperty = (uid: string) => {
        const response = confirm(
            "Bạn có chắc chắn muốn xóa chiến lược này không?"
        );
        if (response) {
            mutate(
                {
                    resource: "strategies",
                    id: uid as string,
                },
                {
                    onSuccess: () => {
                        navigate("/strategies");
                    },
                }
            );
        }
    };

    const strategiesData = data?.data ?? [];
    const { data: user } = useGetIdentity<Indent>();
    const right = isTiepThi(user?.vaitro);

    const [searchText, setSearchText] = useState("");
    const [rows, setRows] = useState<any[]>(strategiesData);

    const requestSearch = (searchValue: string) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
        const filteredRows = strategiesData.filter((row: any) => {
            return Object.keys(row).some((field: any) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(filteredRows);
    };

    React.useEffect(() => {
        setRows(strategiesData);
    }, [strategiesData]);
    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            flex: 2,
        },
        {
            field: "ten",
            headerName: "Tên",
            flex: 3,
        },
        {
            field: "ngaydang",
            headerName: "Ngày đăng",
            flex: 3,
            valueFormatter: ({ value }) => {
                return format(new Date(value), "yyyy-MM-dd");
            },
        },
        {
            field: "nhanvienId",
            headerName: "Nhân viên ID",
            flex: 3,
        },
        {
            field: "action",
            headerName: "Hành động",
            flex: 3,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Stack
                        width="100%"
                        height={"100%"}
                        direction="row"
                        alignItems={"center"}
                        flexWrap="wrap"
                        gap={2}
                    >
                        <SmallButton
                            title={""}
                            backgroundColor="#475BE8"
                            color="#FCFCFC"
                            fullWidth={false}
                            icon={<Edit />}
                            handleClick={() => {
                                navigate(`/strategies/edit/${params.row.id}`);
                            }}
                        />
                        <SmallButton
                            title={""}
                            backgroundColor={"#d42e2e"}
                            disabled={!right}
                            color="#fcfcfc"
                            fullWidth={false}
                            icon={<Delete />}
                            handleClick={() => {
                                handleDeleteProperty(params.row.id);
                            }}
                        />
                    </Stack>
                );
            },
        },
    ];
    if (isError) return <div>Something went wrong</div>;
    return (
        <Box m="1.5rem 2.5rem">
            <Stack direction="column" width="100%">
                <Stack
                    direction="row"
                    width="100%"
                    justifyContent="space-between"
                >
                    <Typography
                        fontSize={25}
                        fontWeight={700}
                        paddingBlockEnd={2}
                    >
                        Chiến lược
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <CustomButton
                            title="Thêm chiến lược"
                            disabled={!right}
                            handleClick={() => navigate("/strategies/create")}
                            backgroundColor={"#475BE8"}
                            color="#fcfcfc"
                            icon={<Add />}
                        />
                    </Stack>
                </Stack>
                <Box mt="40px" height="fit-content">
                    <DataGrid
                        components={{ Toolbar: QuickSearchToolbar }}
                        loading={isLoading || !data}
                        getRowId={(row) => row.id}
                        rows={rows}
                        columns={columns}
                        componentsProps={{
                            toolbar: {
                                value: searchText,
                                onChange: (
                                    event: React.ChangeEvent<HTMLInputElement>
                                ) => requestSearch(event.target.value),
                                clearSearch: () => requestSearch(""),
                            },
                        }}
                    />
                </Box>
            </Stack>
        </Box>
    );
};

export default StrategyList;
