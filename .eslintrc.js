module.exports = {
    root: true,
    fix: true,
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module'
    },
    env: {
      'browser': true
    },
    extends: [ 'eslint:recommended', 'bayzat' ],

    rules: {
        'arrow-parens': [2, 'always', { 'requireForBlockBody': true }],
        'arrow-body-style': [2, 'always'],
        'brace-style': [ 2, '1tbs' ],
        'curly': 2,
        'comma-dangle': [2, 'never' ],
        'eqeqeq': 2,
        'guard-for-in': 2,
        'indent': [ 2, 4, { 'SwitchCase': 1 } ],
        'key-spacing': [ 2, {'beforeColon': false, 'afterColon': true} ],
        'keyword-spacing': 2,
        'max-params': [ 1, 4 ],
        'no-extra-bind': 2,
        'no-lonely-if': 2,
        'no-multi-spaces': 2,
        'no-param-reassign': 'error',
        'no-spaced-func': 2,
        'no-trailing-spaces': 2,
        'object-curly-spacing': ['error', 'always'],
        'spaced-comment': ['error', 'always']
    }
}
