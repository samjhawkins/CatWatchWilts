import PageNotFound from "../components/layout/PageNotFound";
import Home from "../components/layout/Home/Home";
import Blog from "../components/layout/Blog/Blog";
import Cats from "../components/layout/Cats/Cats";
import Donations from "../components/layout/Donations/Donations";
import Contact from "../components/layout/Contact/Contact";

export const pageList = [
    {
        name: "Home",
        path: "/",
        exact: true,
        component: Home,
        color: "primary"
    }, {
        name: "Blog",
        path: "/blog",
        exact: true,
        component: Blog,
        color: "primary"
    }, {
        name: "Cats",
        path: "/cats",
        exact: true,
        component: Cats,
        color: "primary"
    }, {
        name: "Donations",
        path: "/donations",
        exact: true,
        component: Donations,
        color: "primary"
    }, {
        name: "Contact Us",
        path: "/contact",
        exact: true,
        component: Contact,
        color: "primary"
    }
];

export const routesConfig = [
    ...pageList,
    {
        render: PageNotFound
    }
];

