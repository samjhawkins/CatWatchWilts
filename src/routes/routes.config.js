import React from 'react';

const PageNotFound = React.lazy(() =>
  import('../components/layout/PageNotFound'),
);
const Home = React.lazy(() => import('../components/layout/Home/Home'));
const Donations = React.lazy(() =>
  import('../components/layout/Donations/Donations'),
);
const Admin = React.lazy(() => import('../components/layout/Admin/Admin'));
const ViewCat = React.lazy(() =>
  import('../components/layout/ViewCat/ViewCat'),
);
const EditCat = React.lazy(() =>
  import('../components/layout/EditCat/EditCat'),
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
    name: 'EditCat',
    path: '/editcat',
    exact: true,
    private: true,
    component: EditCat,
    color: 'primary',
  },
  {
    name: 'ViewCat',
    path: '/viewcat',
    exact: true,
    component: ViewCat,
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
    render: () => <PageNotFound />,
  },
];
