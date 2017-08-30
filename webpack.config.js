var path = require("path"),
    minified = (process.argv.indexOf('-p') !== -1), // webpack -p is for the minified version
    WebpackAutoInject = require("webpack-auto-inject-version");

module.exports = {
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "markdown-it-katex" + (minified ? ".min" : "") + ".js"
    },
    plugins: [
        new WebpackAutoInject({
            components: {
                AutoIncreaseVersion: true,
                InjectAsComment: true,
                InjectByTag: false
            },
            componentsOptions: {
                AutoIncreaseVersion: {
                    runInWatchMode: false // it will increase version with every single build!
                },
                InjectAsComment: {
                    tag: "markdown-it-katex, build {version} - {date}"
                }
            }
        })
    ]
};