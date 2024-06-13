import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
    ErrorComponent,
    notificationProvider,
    RefineSnackbarProvider,
    ThemedLayoutV2,
    ThemedTitleV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
    CatchAllNavigate,
    DocumentTitleHandler,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
} from "react-router-dom";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";

import { Login } from "./pages/login";
import { ProductCreate, ProductEdit, ProductList } from "./pages/products";
import { OrderEdit, OrderList } from "./pages/orders";

import {
    AccountCircleOutlined,
    Inventory2Outlined,
    InventoryOutlined,
    PermContactCalendarOutlined,
    YardOutlined,
    AutoAwesomeMosaicOutlined,
    StorefrontOutlined,
    InsertEmoticonOutlined,
    DiscountOutlined,
    Museum,
    DensitySmall,
} from "@mui/icons-material";
import { AccountList } from "./pages/accounts";
import AccountCreate from "./pages/accounts/create";
import AccountEdit from "./pages/accounts/edit";
import StaffList from "./pages/staff/list";
import StaffCreate from "./pages/staff/create";
import StaffEdit from "./pages/staff/edit";
import StrategyList from "./pages/strategies/list";
import StrategyCreate from "./pages/strategies/create";
import StrategyEdit from "./pages/strategies/edit";
import DashboardHome from "./pages/dashboard/home";
import ProductDetail from "./pages/products/product-detail";
import PromotionList from "./pages/promotions/list";
import PromotionCreate from "./pages/promotions/create";
import PromotionEdit from "./pages/promotions/edit";
import CustomerList from "./pages/customers/list";
import CustomerCreate from "./pages/customers/create";
import StoreProductList from "./pages/store/list";
import HomePage from "./pages";
import StoreProductEdit from "./pages/store/edit";
import { baseUrl } from "./constants/url";

function App() {
    return (
        <BrowserRouter>
            {/* <GitHubBanner /> */}
            <RefineKbarProvider>
                <ColorModeContextProvider>
                    <CssBaseline />
                    <GlobalStyles
                        styles={{ html: { WebkitFontSmoothing: "auto" } }}
                    />
                    <RefineSnackbarProvider>
                        <DevtoolsProvider>
                            <Refine
                                dataProvider={dataProvider(`${baseUrl}/api/v1`)}
                                Title={({ collapsed }) => (
                                    <div>
                                        <span>Gloss And Glam</span>
                                    </div>
                                )}
                                notificationProvider={notificationProvider}
                                routerProvider={routerBindings}
                                authProvider={authProvider}
                                resources={[
                                    {
                                        name: "products",
                                        list: "/products",
                                        create: "/products/create",
                                        edit: "/products/edit/:id",
                                        show: "/products/show/:id",
                                        meta: {
                                            canDelete: true,
                                            label: "Kho hàng",
                                        },
                                        icon: <Inventory2Outlined />,
                                    },
                                    {
                                        name: "dashboard",
                                        list: "/dashboard",
                                        meta: {
                                            canDelete: true,
                                            label: "Thống kê",
                                        },
                                    },
                                    {
                                        name: "accounts",
                                        list: "/accounts",
                                        create: "/accounts/create",
                                        edit: "/accounts/edit/:id",
                                        // show: "/categories/show/:id",
                                        meta: {
                                            canDelete: true,
                                            label: "Tài khoản",
                                        },
                                        icon: <AccountCircleOutlined />,
                                    },
                                    {
                                        name: "customers",
                                        list: "/customers",
                                        create: "/customers/create",
                                        meta: {
                                            canDelete: true,
                                            label: "Khách hàng",
                                        },
                                        icon: <InsertEmoticonOutlined />,
                                    },
                                    {
                                        name: "store",
                                        list: "/store",
                                        create: "/store/create",
                                        edit: "/store/edit/:id",
                                        meta: {
                                            canDelete: true,
                                            label: "Cửa hàng",
                                        },
                                        icon: <StorefrontOutlined />,
                                    },
                                    {
                                        name: "strategies",
                                        list: "/strategies",
                                        create: "/strategies/create",
                                        edit: "/strategies/edit/:id",
                                        // show: "/categories/show/:id",
                                        meta: {
                                            canDelete: true,
                                            label: "Chiến lược",
                                        },
                                        icon: <YardOutlined />,
                                    },

                                    {
                                        name: "promotions",
                                        list: "/promotions",
                                        create: "/promotions/create",
                                        edit: "/promotions/edit/:id",
                                        // show: "/categories/show/:id",
                                        meta: {
                                            canDelete: true,
                                            label: "Khuyến mãi",
                                        },
                                        icon: <DiscountOutlined />,
                                    },
                                    {
                                        name: "staff",
                                        list: "/staff",
                                        create: "/staff/create",
                                        edit: "/staff/edit/:id",
                                        // show: "/categories/show/:id",
                                        meta: {
                                            canDelete: true,
                                            label: "Nhân viên",
                                        },
                                        icon: <PermContactCalendarOutlined />,
                                    },
                                    {
                                        name: "orders",
                                        list: "/orders",
                                        edit: "/orders/edit/:id",
                                        meta: {
                                            canDelete: true,
                                            label: "Đơn hàng",
                                        },
                                        icon: <InventoryOutlined />,
                                    },
                                ]}
                                options={{
                                    syncWithLocation: true,
                                    warnWhenUnsavedChanges: true,
                                    useNewQueryKeys: true,
                                    projectId: "DiUxNC-6fsHXI-Vvu2kE",
                                }}
                            >
                                <Routes>
                                    <Route
                                        element={
                                            <Authenticated
                                                key="authenticated-inner"
                                                fallback={
                                                    <CatchAllNavigate to="/login" />
                                                }
                                            >
                                                <ThemedLayoutV2
                                                    Header={() => (
                                                        <Header sticky />
                                                    )}
                                                    Title={({ collapsed }) => (
                                                        <ThemedTitleV2
                                                            // collapsed is a boolean value that indicates whether the <Sidebar> is collapsed or not
                                                            collapsed={
                                                                collapsed
                                                            }
                                                            icon={
                                                                collapsed ? (
                                                                    <DensitySmall />
                                                                ) : (
                                                                    <Museum />
                                                                )
                                                            }
                                                            text="Gloss & Glam"
                                                        />
                                                    )}
                                                >
                                                    <Outlet />
                                                </ThemedLayoutV2>
                                            </Authenticated>
                                        }
                                    >
                                        <Route path="/">
                                            <Route
                                                index
                                                element={<HomePage />}
                                            />
                                        </Route>
                                        <Route path="/store">
                                            <Route
                                                index
                                                element={<StoreProductList />}
                                            />
                                            <Route
                                                path="edit/:id"
                                                element={<StoreProductEdit />}
                                            />
                                        </Route>
                                        <Route path="/customers">
                                            <Route
                                                index
                                                element={<CustomerList />}
                                            />
                                            <Route
                                                path="create"
                                                element={<CustomerCreate />}
                                            />
                                        </Route>
                                        <Route path="/products">
                                            <Route
                                                index
                                                element={<ProductList />}
                                            />
                                            <Route
                                                path="create"
                                                element={<ProductCreate />}
                                            />
                                            <Route
                                                path="edit/:id"
                                                element={<ProductEdit />}
                                            />
                                            <Route
                                                path="show/:id"
                                                element={<ProductDetail />}
                                            />
                                        </Route>
                                        <Route path="/accounts">
                                            <Route
                                                index
                                                element={<AccountList />}
                                            />
                                            <Route
                                                path="create"
                                                element={<AccountCreate />}
                                            />
                                            <Route
                                                path="edit/:id"
                                                element={<AccountEdit />}
                                            />
                                        </Route>
                                        <Route path="/staff">
                                            <Route
                                                index
                                                element={<StaffList />}
                                            />
                                            <Route
                                                path="create"
                                                element={<StaffCreate />}
                                            />
                                            <Route
                                                path="edit/:id"
                                                element={<StaffEdit />}
                                            />
                                        </Route>
                                        <Route path="/promotions">
                                            <Route
                                                index
                                                element={<PromotionList />}
                                            />
                                            <Route
                                                path="create"
                                                element={<PromotionCreate />}
                                            />
                                            <Route
                                                path="edit/:id"
                                                element={<PromotionEdit />}
                                            />
                                        </Route>
                                        <Route path="/strategies">
                                            <Route
                                                index
                                                element={<StrategyList />}
                                            />
                                            <Route
                                                path="create"
                                                element={<StrategyCreate />}
                                            />
                                            <Route
                                                path="edit/:id"
                                                element={<StrategyEdit />}
                                            />
                                        </Route>
                                        <Route path="/orders">
                                            <Route
                                                index
                                                element={<OrderList />}
                                            />
                                            <Route
                                                path="edit/:id"
                                                element={<OrderEdit />}
                                            />
                                        </Route>
                                        <Route path="/dashboard">
                                            <Route
                                                index
                                                element={<DashboardHome />}
                                            />
                                        </Route>
                                        <Route
                                            path="*"
                                            element={<ErrorComponent />}
                                        />
                                    </Route>
                                    <Route
                                        element={
                                            <Authenticated
                                                key="authenticated-outer"
                                                fallback={<Outlet />}
                                            >
                                                <NavigateToResource />
                                            </Authenticated>
                                        }
                                    >
                                        <Route
                                            path="/login"
                                            element={<Login />}
                                        />
                                    </Route>
                                </Routes>

                                <RefineKbar />
                                <UnsavedChangesNotifier />
                                <DocumentTitleHandler />
                            </Refine>
                            <DevtoolsPanel />
                        </DevtoolsProvider>
                    </RefineSnackbarProvider>
                </ColorModeContextProvider>
            </RefineKbarProvider>
        </BrowserRouter>
    );
}

export default App;
