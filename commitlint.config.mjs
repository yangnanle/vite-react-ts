export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat', // 添加新功能
                'fix', // 修复bug
                'docs', // 文档
                'style', // CSS
                'refactor', //  重构代码
                'perf', //  提高性能
                'test', //  测试
                'build', //  构建
                'ci', //  持续集成
                'chore', //  其它修改
                'revert', //  回滚
                'format', //  格式化
                'comment', //  注释
                'log', // 日志
                'version', // 版本
            ],
        ],
        'subject-empty': [2, 'never'],
    },
}
