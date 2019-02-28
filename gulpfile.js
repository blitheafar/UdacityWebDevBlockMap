var gulp = require('gulp');
gulp.task('default', defaultTask);
var browserSync = require('browser-sync').create();

function defaultTask(done) {
    // Listen to change events on HTML and reload
    browserSync.watch("*.html").on("change", browserSync.reload);

    browserSync.watch("js/*.js").on("change", browserSync.reload);

    // Provide a callback to capture ALL events to CSS
    // files - then filter for 'change' and reload all
    // css files on the page.
    browserSync.watch("css/*.css", function(event, file) {
        if (event === "change") {
            browserSync.reload("*.css");
        }
    });

    browserSync.init({
        // 这里的意思是含有这个文件的目录地址，可以将目录更改
        server: "./",
        browser: "google chrome"
    });
    browserSync.stream();
    done();
}
