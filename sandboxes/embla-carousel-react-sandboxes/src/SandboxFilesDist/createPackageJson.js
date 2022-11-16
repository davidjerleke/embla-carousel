import docsPackageJson from 'embla-carousel-docs/package.json';
export const createPackageJson = () => ({
    name: 'react',
    version: '1.0.0',
    description: 'React example starter project',
    keywords: ['react', 'starter'],
    main: 'src/index.js',
    dependencies: {
        react: docsPackageJson.dependencies.react,
        'react-dom': docsPackageJson.dependencies['react-dom'],
        'react-scripts': '4.0.0',
        'embla-carousel-react': docsPackageJson.dependencies['embla-carousel-react'],
    },
    devDependencies: {
        '@babel/runtime': '7.13.8',
        typescript: '4.1.3',
    },
    scripts: {
        start: 'react-scripts start',
        build: 'react-scripts build',
        test: 'react-scripts test --env=jsdom',
        eject: 'react-scripts eject',
    },
    browserslist: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all'],
});
