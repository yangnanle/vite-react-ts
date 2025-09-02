# hooks

## useRoute

> 如果有路径参数，请先在路由配置中配置参数。如：`/test/:id`

### 跳转使用

```tsx
import { useRoute } from '@/hooks/useRoute';

const Home = () => {
    const { go } = useRoute();

    return (
        <div>
            <button
                onClick={() =>
                    go('/test/123', {
                        query: { tab: 'info', page: 2 },
                        state: { from: 'home' },
                    })
                }
            >
                去测试页
            </button>
        </div>
    );
};
export default Home;
```

### 获取路由信息

```tsx
import { useRoute } from '@/hooks/useRoute';
// 最好写上类型
interface Params {
    id: string;
}

interface Query {
    tab?: string;
    page?: string;
}

const test = () => {
    const { params, query, pathname, go } = useRoute<Params, Query>();

    return (
        <div>
            <p>路由上的参数 ID: {params.id} --》 123</p>
            <p>Query 参数: {JSON.stringify(query)} --》 {"tab":"info","page":"2"}</p>
            <p>当前路径: {pathname} --》 /test/123</p>
            {/* 回退上一页 */}
            <button onClick={() => go(-1)}>返回首页</button>
        </div>
    );
};

export default test;
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            // Other configs...

            // Remove tseslint.configs.recommended and replace with this
            ...tseslint.configs.recommendedTypeChecked,
            // Alternatively, use this for stricter rules
            ...tseslint.configs.strictTypeChecked,
            // Optionally, add this for stylistic rules
            ...tseslint.configs.stylisticTypeChecked,

            // Other configs...
        ],
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
            },
            // other options...
        },
    },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            // Other configs...
            // Enable lint rules for React
            reactX.configs['recommended-typescript'],
            // Enable lint rules for React DOM
            reactDom.configs.recommended,
        ],
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.node.json', './tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
            },
            // other options...
        },
    },
]);
```
