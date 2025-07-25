import { StrictMode } from "react"; //dev-only tool
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {Toaster} from "react-hot-toast";
import { UserProvider } from "./component/UserContext/UserContext";

import LoginForm from "./component/Login/LoginForm";
import Home from "./component/Home/Home";
import About from "./component/About/About";
import Contact from "./component/Contact/Contact";
import Layout from "../Layout/Layout";
import AddBlog from "./component/AddBlog/AddBlog";
import Blog from "./component/Blog/Blog";
import NotFound from "./component/NotFound/NotFound";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path:"",
        element:<Home/>
      },
      {
        path:"about",
        element:<About/>
      },
      {
        path:"contact",
        element:<Contact/>
      },
      {
        path:"addBlog",
        element:<AddBlog/>
      },
      {
        path: "blog/:id",
        element: <Blog/>,
      },
      {
        path: "*",
        element: <NotFound />
      },
    ]
  },
  {
    path: "/signup",
    element: <LoginForm />,
  },
  {
    path: "/signin",
    element: <LoginForm />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider value={{ CurrentUser: null, AllBlogs: [] }}>
      <Toaster position="top-right"  />
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);

// RouterProvider sets up the routing context, allowing your app to render
// different components based on the current URL (like /home, /about, etc.).
// router={router} prop supplies the routing configuration
// (typically created using createBrowserRouter() or createHashRouter()).

// createRoot sets up the place where a Virtual DOM {lightweight copy} will live (but the tree is still empty).
// .render actually creates or updates the Virtual DOM tree and syncs it to the real DOM.

//createRoot Start rendering something Pause if something more important (like a button click) happens Resume later