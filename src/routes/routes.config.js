import Home from "../components/Home/Home";
import PageNotFound from "../components/PageNotFound";

export const routesConfig = [
    {
        path: "/(home)?",
        exact: true,
        component: Home
    }, {
        render: PageNotFound
    }
];