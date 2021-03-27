import esbuildServe from 'esbuild-serve';

esbuildServe(
    {
        entryPoints: ['index.js'],
        bundle: true,
        outfile: 'public/index.js'
    },
    {
        // serve options (optional)
        port: 3000,
        root: './public/'
    }
);
