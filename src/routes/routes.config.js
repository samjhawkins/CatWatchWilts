import PageNotFound from '../components/layout/PageNotFound';
import Home from '../components/layout/Home/Home';
import Cats from '../components/layout/Cats/Cats';
import Donations from '../components/layout/Donations/Donations';
import Login from '../components/layout/Login/Login';
import Admin from '../components/layout/Admin/Admin';
import ViewCat from '../components/layout/ViewCat/ViewCat';

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
