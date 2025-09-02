import { useNavigate, useParams, useLocation, type Path } from 'react-router-dom';

type WithIndex<T> = T & { [key: string]: string | undefined };

/**
 * 泛型 TParams: 动态路由参数类型
 * 泛型 TQuery: query 参数类型
 */
export const useRoute = <TParams extends object = object, TQuery extends object = object>() => {
    const navigate = useNavigate();
    const params = useParams<WithIndex<TParams>>();
    const location = useLocation();

    /**
     * 获取 query 参数
     */
    const getQuery = (): TQuery => {
        const searchParams = new URLSearchParams(location.search);
        const query: Partial<TQuery> = {};
        searchParams.forEach((value, key) => {
            if (key) {
                (query as any)[key] = value;
            }
        });
        return query as TQuery;
    };

    /**
     * 路由跳转
     * @param path 路径
     * @param options 可选参数
     *        replace?: boolean 是否替换历史记录
     *        state?: any 附带 state
     *        query?: Record<string, any> query 对象
     */
    const go = (
        path: Path | string | number,
        options?: {
            replace?: boolean;
            state?: any;
            query?: Record<string, string | number | boolean>;
        },
    ) => {
        if (typeof path === 'number') {
            // 数字代表跳转索引，直接回退
            navigate(path);
            return;
        }

        let fullPath = path.toString();

        if (options?.query) {
            const searchParams = new URLSearchParams();
            Object.entries(options.query).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    searchParams.append(key, String(value));
                }
            });
            const queryString = searchParams.toString();
            if (queryString) {
                fullPath += fullPath.includes('?') ? '&' + queryString : '?' + queryString;
            }
        }
        try {
            navigate(fullPath, { replace: options?.replace, state: options?.state });
        } catch (error) {
            console.error('useRoute.go: 路由跳转失败', error);
        }
    };

    return {
        go,
        params, // 路径参数
        query: getQuery(), // query查询参数
        pathname: location.pathname, // 当前路径
    };
};
