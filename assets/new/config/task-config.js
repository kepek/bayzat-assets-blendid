module.exports = {
    html: false,
    images: true,
    fonts: true,
    static: true,
    svgSprite: true,
    ghPages: false,
    stylesheets: true,

    javascripts: {
        entry: {
            // files paths are relative to
            // javascripts.dest in path-config.json
            main: ["./main.js"]
        },
        publicPath: './web/assets/new/javascripts'
    },

    browserSync: {
        proxy: 'local.bayzat.com',
        files: ['./src/**/*', './app/**/*/*.twig']
    },

    production: {
        rev: false
    }
}
