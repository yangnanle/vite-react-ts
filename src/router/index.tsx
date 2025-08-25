
import { Routes, Route } from 'react-router-dom';
import type { RouteConfig } from '@/types/global';
import App from '../App';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import NotFound from '@/pages/404';
import UserPermission from '@/pages/Permission/UserPermission';
import PrivacyPermission from '@/pages/Permission/PrivacyPermission';


export const routes: RouteConfig[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/home',
                name: '首页',
                element: <Home />,
            },
            // 二级菜单示例
            {
                path: '/permission',
                name: '权限',
                children: [
                    {
                        path: '/permission/user',
                        name: '用户权限',
                        element: <UserPermission />,
                    },
                    {
                        path: '/permission/privacy',
                        name: '隐私权限',
                        element: <PrivacyPermission />,
                    }
                ]
            }
        ],
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
];


const renderRoutes = (routes: RouteConfig[]) => {
    return routes.map(({ path, element, children }, idx) => (
        <Route key={path || idx} path={path} element={element}>
            {children && renderRoutes(children)}
        </Route>
    ));
};

const Router = () => <Routes>{renderRoutes(routes)}</Routes>;

export default Router;
