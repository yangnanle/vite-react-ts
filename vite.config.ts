import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import legacy from '@vitejs/plugin-legacy';
import viteCompression from 'vite-plugin-compression';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    // 加载 .env 文件
    const env = loadEnv(mode, process.cwd());
    console.log('当前环境变量:', env);

    return {
        plugins: [
            react(),
            legacy({
                targets: ['defaults', 'IE 11'],
                additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
            }),
            viteCompression({
                threshold: 10240, // 只压缩大于10KB的文件
                algorithm: 'gzip', // 可选: gzip、brotliCompress、deflate、deflateRaw
                ext: '.gz', // 生成.gz文件
                deleteOriginFile: false, // 是否删除源文件
            }),
        ],
        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: resolve(__dirname, './src'),
                },
                {
                    find: '@components',
                    replacement: resolve(__dirname, './src/components'),
                }
            ],
            extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'], // 可省略后缀
        },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                },
                // 可配置 scss/sass 等
            },
            devSourcemap: mode === 'development',
        },
        server: {
            port: 3000, // 启动端口
            open: true, // 启动自动打开浏览器
            cors: true, // 允许跨域
            strictPort: false, // 端口被占用时是否退出
            proxy: {
                // 代理配置示例
                '/api': {
                    target: 'http://localhost:8080',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, ''),
                },
            },
        },
        build: {
            outDir: 'dist', // 输出目录
            assetsDir: 'static', // 静态资源目录
            sourcemap: mode !== 'development', // 生产环境生成 source map
            cssCodeSplit: true, // 启用/禁用 CSS 代码拆分
            minify: 'esbuild', // 可选: 'terser' | 'esbuild'
            brotliSize: false, // 关闭 brotli 体积计算，加快构建
            chunkSizeWarningLimit: 2000, // 单文件体积警告阈值（kb）
            rollupOptions: {
                output: {
                    manualChunks: (id: string) => {
                        if (id.includes('node_modules')) { // 拆分第三方包到 vendor.js
                            return 'vendor';
                        }
                        if (id.includes('src/pages')) { // 拆分页面级代码
                            const chunkName = id.match(/src\/pages\/(.*)\//);
                            return chunkName ? `page-${chunkName[1]}` : 'common';
                        }
                    },
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                },
                external: [], // 忽略外部依赖
            },
            terserOptions: {
                compress: {
                    drop_console: mode !== 'development', // 生产环境去除 console
                    drop_debugger: true,
                },
            },
        },
        assetsInclude: ['**/*.gltf'], // 额外静态资源类型
        define: {
            __APP_VERSION__: JSON.stringify('1.0.0'),
            // 可注入全局常量
        },
        esbuild: {
            // esbuild 相关配置
            pure: mode !== 'development' ? ['console.log'] : [],
        },
        optimizeDeps: {
            include: ['react', 'react-dom'], // 预构建依赖
            exclude: [],
        },
        // 其他高级配置可按需补充
    };
});
