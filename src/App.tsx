import { Link, Outlet, useLocation } from 'react-router-dom';
import './App.css';
import { routes } from './router';
import type { RouteConfig } from '@/types/global';

function App() {
    const location = useLocation();

    // 递归渲染树状菜单-样式需改
    const renderMenu = (routes: RouteConfig[], level = 0) => {
        return (
            <div style={{ display: 'flex' }}>
                {routes
                    .filter((r) => r.name)
                    .map((route: RouteConfig) => {
                        const isActive = location.pathname === route.path;

                        return (
                            <div key={route.path} style={{ marginBottom: 4, marginLeft: level * 16 }}>
                                <Link
                                    to={route.children ? route.children[0].path : route.path}
                                    style={{
                                        marginRight: 8,
                                        color: isActive ? '#00967a' : undefined,
                                    }}
                                >
                                    {route.name}
                                </Link>
                                {route.children && renderMenu(route.children, level + 1)}
                            </div>
                        );
                    })}
            </div>
        );
    };
    return (
        <>
            <nav>{renderMenu(routes[0].children || [])}</nav>
            <Outlet />
        </>
    );
}

export default App;
