import { Authenticated, ErrorComponent, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { type ClientParams } from "refine-frappe-provider";
import { authProvider } from "./authProvider";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/layout";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notificationProvider } from "./providers/notificationProvider";
import { ProductList } from "./pages/products/list";
import { storeProvider } from "./dataProviders/storeProvider";
import {
  dataProvider as frappeDataProvider,
  authProvider as frappeAuthProvider,
} from "refine-frappe-provider";
import { AddressList } from "./pages/address/list";
import { AddressCreate } from "./pages/address/create";
import { AddressEdit } from "./pages/address/edit";
import { CartProvider } from "./hooks/useCart";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ProductShow } from "./pages/products/show";

const providerConfig = {
  url: import.meta.env.VITE_BACKEND_URL,
} satisfies ClientParams;

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: Record<string, string>) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <DevtoolsProvider>
          <Refine
            dataProvider={{
              default: dataProvider("https://api.fake-rest.refine.dev"),
              storeProvider: storeProvider,
              frappeeProvider: frappeDataProvider(providerConfig),
            }}
            i18nProvider={i18nProvider}
            routerProvider={routerBindings}
            authProvider={authProvider}
            // authProvider={frappeAuthProvider(providerConfig)}
            notificationProvider={notificationProvider}
            resources={[
              {
                name: "blog_posts",
                list: "/blog-posts",
                create: "/blog-posts/create",
                edit: "/blog-posts/edit/:id",
                show: "/blog-posts/show/:id",
                meta: {
                  canDelete: true,
                },
              },
              {
                name: "categories",
                list: "/categories",
                create: "/categories/create",
                edit: "/categories/edit/:id",
                show: "/categories/show/:id",
                meta: {
                  canDelete: true,
                },
              },
              {
                name: "address",
                list: "/address",
                create: "/address/create",
                edit: "/address/edit/:id",
                show: "/address/show/:id",
                meta: {
                  dataProviderName: "storeProvider",
                  canDelete: true,
                },
              },
              {
                name: "products",
                meta: {
                  dataProviderName: "storeProvider",
                },
                list: "/",
                show: "/show/:id",
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
              projectId: "z8IRvt-f1kOr3-1a0UTY",
            }}
          >
            <CartProvider>
              <Routes>
                <Route index element={<ProductList />} />
                <Route path="/show/:id" element={<ProductShow />} />
                <Route
                  element={
                    <Authenticated
                      key="authenticated-inner"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="blog_posts" />}
                  />
                  <Route path="/blog-posts">
                    <Route index element={<BlogPostList />} />
                    <Route path="create" element={<BlogPostCreate />} />
                    <Route path="edit/:id" element={<BlogPostEdit />} />
                    <Route path="show/:id" element={<BlogPostShow />} />
                  </Route>
                  <Route path="/categories">
                    <Route index element={<CategoryList />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="show/:id" element={<CategoryShow />} />
                  </Route>
                  <Route path="/address">
                    <Route index element={<AddressList />} />
                    <Route path="create" element={<AddressCreate />} />
                    <Route path="edit/:id" element={<AddressEdit />} />
                  </Route>
                  <Route path="*" element={<ErrorComponent />} />
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
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Route>
              </Routes>
            </CartProvider>
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
            <ToastContainer />
            <ReactQueryDevtools initialIsOpen={false} />
          </Refine>
          <DevtoolsPanel />
        </DevtoolsProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
