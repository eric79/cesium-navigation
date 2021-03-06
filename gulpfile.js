var amdOptimize = require('amd-optimize');
var concat = require('gulp-concat');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var del = require('del');
var eventStream = require('event-stream');
var gfilter = require('gulp-filter');

gulp.task('bundle-minified',['less'],  function ()
{
    var filter = gfilter(["*", "!gulpfile.js", "!NavigationStartup.js", "!lib/ThirdParty/almond.js", "!node_modules/*.*"]);
    var almond = gulp.src("lib/ThirdParty/almond.js");
    var cesiumNavigation = gulp.src('**/*.js')
           // .pipe(jshint())
           .pipe(filter)
           .pipe(amdOptimize('NavigationStartup',
           {
            configFile: "NavigationStartup.js",
            baseUrl: '../cesium-navigation/'
        }
        ));
           return eventStream.merge(almond, cesiumNavigation)
           .pipe(concat("cesium-navigation.js"))
           .pipe(uglify())
           .pipe(gulp.dest("dist/cesium-navigation"))
           .pipe(notify('eventStream merging build completed'));
       });

gulp.task('bundle-unminified',['lessUnminified'],  function ()
{
    var filter = gfilter(["*", "!gulpfile.js", "!NavigationStartup.js", "!lib/ThirdParty/almond.js", "!node_modules/*.*"]);
    var almond = gulp.src("lib/ThirdParty/almond.js");
    var cesiumNavigation = gulp.src('**/*.js')
           // .pipe(jshint())
           .pipe(filter)
           .pipe(amdOptimize('NavigationStartup',
           {
            configFile: "NavigationStartup.js",
            baseUrl: '../cesium-navigation/'
        }
        ));
           return eventStream.merge(almond, cesiumNavigation)
           .pipe(concat("cesium-navigation.js"))
   // .pipe(uglify())
   .pipe(gulp.dest("dist/cesium-navigation"))
   .pipe(notify('eventStream merging build completed'));
});


gulp.task('less', ['cleanDist'], function ()
{
    gulp.src('lib/Styles/less/cesium-navigation.less')
    .pipe(less({compress: true}).on('error', gutil.log))
    .pipe(minifyCSS({keepBreaks: false}))
    .pipe(gulp.dest('dist/cesium-navigation'))
    .pipe(notify('Less Compiled, compressed and minified'));
});

gulp.task('lessUnminified', ['cleanDist'], function ()
{
    gulp.src('lib/Styles/less/cesium-navigation.less')
            .pipe(less({compress: false}).on('error', gutil.log))
            //.pipe(minifyCSS({keepBreaks: false}))
            .pipe(gulp.dest('dist/cesium-navigation'))
            .pipe(notify('Less Compiled, uncompressed and unminified'));
});



gulp.task('cleanDist', function () {
    del.sync(['./dist'], function(err, deletedFiles) {
        if(deletedFiles.length) {
          gutil.log('Deleted', gutil.colors.red(deletedFiles.join(' ,')) );
      } else {
          gutil.log(gutil.colors.yellow('dist directory empty - nothing to delete'));
      }
  });
});

gulp.task('default', ['cleanDist', 'less', 'bundle-minified'], function () {
});


gulp.task('release-unminified', ['cleanDist', 'lessUnminified', 'bundle-unminified'], function () {
});