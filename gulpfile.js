var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var del = require('del');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var ftp = require('gulp-ftp');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var webpack = require("webpack");
var gds = require('gulp-dev-server');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

//имена папок Разработки
var style = 'style';
var script = 'script';
var app = 'app';
var fonts = 'fonts';
var image = 'image';

//имя папки на хосте
var host_src = '';

//имена папок Сборки
var build_fonts = 'fonts';
var build_image = 'image';

// gulp.task("webpack:build", function(callback) {
//     // modify some webpack config options
//     var myConfig = Object.create(
//         module.exports = {
//             entry: "./app/app",
//             output: {
//                 path: __dirname + "/script",
//                 filename: "build.js"
//             },
//             module: {
//                 loaders: [
//                     {
//                         test: /\.js$/,
//                         loader: 'babel-loader?presets[]=es2015'
//                     },
//                     {
//                         test: /\.css$/,
//                         loader: 'style-loader!css-loader'
//                     },
//                     {
//                         test: /\.scss$/,
//                         exclude: /node_modules/,
//                         loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader"),
//                     },
//                     {
//                         test: /\.(jpe?g|gif|png)$/,
//                         loader: 'file-loader?emitFile=false&name=[path][name].[ext]'
//                     }
//                 ],
//                 rules: [
//                     {
//                         use: {
//                             loader:'babel-loader',
//                             options: { presets: ['es2015'] }
//                         },
//                         test: /\.js$/,
//                         exclude: /node_modules/
//                     }
//                 ]
//             },
//             plugins: [
//                 new webpack.ProvidePlugin({
//                     jQuery: "jquery",
//                     $: "jquery"
//                 })
//             ]
//         }
//     );
//     myConfig.plugins = myConfig.plugins.concat(
//         new webpack.DefinePlugin({
//             "process.env": {
//                 // This has effect on the react lib size
//                 "NODE_ENV": JSON.stringify("production")
//             }
//         }),
//         new webpack.optimize.DedupePlugin(),
//         new webpack.optimize.UglifyJsPlugin()
//     );

//     // run webpack
//     webpack(myConfig, function(err, stats) {
//         if(err) throw new gutil.PluginError("webpack:build", err);
//         callback();
//     });
// });


gulp.task('sass', function() {
    return gulp.src(style + '/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(style));
});


// gulp.task('component', function() {
//     return  gulp.src('app/components/*/style/*.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(autoprefixer({
//             browsers: ['last 10 versions'],
//             cascade: false
//         }))
//         .pipe(gulp.dest('app/components/'));
// });

gulp.task('img', function() {
    return gulp.src(image + '/**/*')
        .pipe(gulp.dest('origin-images/'))
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imageminJpegRecompress({
                loops: 5,
                min: 65,
                max: 70,
                quality:'medium'
            }),
            imagemin.svgo(),
            imagemin.optipng({optimizationLevel: 4}),
            pngquant({quality: '75-85', speed: 5})
        ],{
            verbose: true
        }))
        .pipe(gulp.dest('dist/' + build_image));
});

gulp.task('watch', function () {
    // gulp.watch(style + '/sass/**/*.scss')
    gulp.watch(style + '/**/*.scss', ['sass']);
    
});

gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('files', function () {
    gulp.src(fonts + '/**/*')
        .pipe(gulp.dest('dist/' + build_fonts));
    gulp.src('*.php')
        .pipe(gulp.dest('dist/'));
    gulp.src('*.ico')
        .pipe(gulp.dest('dist/'));
    gulp.src('phpmailer/**/*')
        .pipe(gulp.dest('dist/phpmailer'));

});

gulp.task('build', ['clean', 'files', 'webpack:build'], function () {
    return gulp.src('*.html')
        .pipe(useref())
        .pipe(gulpif('*.css', cleanCSS()))
        .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(gulpif('*.js', minify({
            ext:{
                min:'.js'
            },
        })))
        .pipe(gulp.dest('dist'));
});

gulp.task('deploy', ['build'], function () {
    return gulp.src('dist/**/*')
        .pipe(ftp({
            host: '87.236.19.39',
            user: 'kononobs_tolik',
            pass: 'Gangybasm107',
            remotePath: '/beymax.ru/public_html/demo/' + host_src
        }))
});

gulp.task('default', ['sass', 'watch']);