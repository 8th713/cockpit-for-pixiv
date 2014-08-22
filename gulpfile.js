var gulp = require('gulp'),
    gutil = require('gulp-util'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify'),
    browserify = require('browserify'),
    aliasify = require('aliasify'),
    streamify = require('gulp-streamify'),
    header = require('gulp-header'),
    template = require('gulp-template'),
    fs = require('fs'),
    htmlify = require('./lib/transform.js'),
    pkg = require('./package.json');

var aliases = {
  api:   './src/services/api.js',
  http:  './src/services/http.js',
  keys:  './src/services/keys.js',
  utils: './src/services/utils.js'
};

watchify.args.fullPaths = false;

gulp.task('dev', function() {
  var bundler = watchify(browserify('./src/index.js', watchify.args));

  aliasify = aliasify.configure({aliases: aliases});
  bundler.transform(aliasify);
  bundler.transform(htmlify);
  bundler.transform('node-lessify');
  bundler.on('update', rebundle);
  bundler.on('log', gutil.log);

  function rebundle() {
    return bundler.bundle()
      .on('error', function(err) {
        gutil.log('Browserify Error', err);
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./'));
  }

  return rebundle();
});

gulp.task('build', function() {
  var bundler = browserify('./src/index.js', watchify.args),
      head = fs.readFileSync('metadata');

  aliases.vue = 'vue/dist/vue.min.js';
  aliasify = aliasify.configure({aliases: aliases});
  bundler.transform(aliasify);
  bundler.transform(htmlify);
  bundler.transform('node-lessify');

  return bundler.bundle()
    .pipe(source(pkg.name + '.user.js'))
    .pipe(streamify(header(head, { pkg : pkg })))
    .pipe(gulp.dest('./gh-pages'));
});

gulp.task('template', function() {
  return gulp.src('./index.html')
    .pipe(template({pkg: pkg}))
    .pipe(gulp.dest('./gh-pages/'));
});

gulp.task('docs', ['build', 'template']);

gulp.task('watch', ['docs'], function() {
  gulp.watch('./index.html', ['template']);
});

gulp.task('default', ['dev']);
