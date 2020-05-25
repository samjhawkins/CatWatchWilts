import React from 'react';

const PageNotFound = React.lazy(() =>
  import('../components/layout/PageNotFound'),
);
const Home = React.lazy(() => import('../components/layout/Home/Home'));
const Cats = React.lazy(() => import('../components/layout/Cats/Cats'));
const Donations = React.lazy(() =>
  import('../components/layout/Donations/Donations'),
);
const Login = React.lazy(() => import('../components/layout/Login/Login'));
const Admin = React.lazy(() => import('../components/layout/Admin/Admin'));
const ViewCat = React.lazy(() =>
  import('../components/layout/ViewCat/ViewCat'),
);

export const pageList = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: Home,
    color: 'primary',
  },
  {
    name: 'Cats',
    path: '/cats',
    exact: true,
    component: Cats,
    color: 'primary',
  },
  {
    name: 'Donations',
    path: '/donations',
    exact: true,
    component: Donations,
    color: 'primary',
  },
];

export const routesConfig = [
  ...pageList,
  {
    name: 'ViewCat',
    path: '/viewcat',
    exact: true,
    component: ViewCat,
    color: 'primary',
  },
  {
    name: 'Login',
    path: '/login',
    exact: true,
    component: Login,
    color: 'primary',
  },
  {
    name: 'Admin',
    path: '/admin',
    exact: true,
    private: true,
    component: Admin,
  },
  {
    render: PageNotFound,
  },
];
