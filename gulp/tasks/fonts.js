import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
  // Ищем файлы шрифтов .otf
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "FONTS",
        message: "Error: <%= error.message %>"
      }))
    )
    // Конвертируем в .ttf
    .pipe(fonter({
      formats: ['ttf']
    }))
    // Выгружаем в исходную папку
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = () => {
  // Ищем файлы шрифтов .ttf
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "FONTS",
        message: "Error: <%= error.message %>"
      }))
    )
    // Конвертируем в .ttf
    .pipe(fonter({
      formats: ['woff']
    }))
    // выгружаем в папку с результатом
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    // Ищем файлы шрифтов .ttf
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    // Конвертируем в .woff2
    .pipe(ttf2woff2())
    // выгружаем в папку с результатом
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

export const fontsStyle = () => {
  // Файл стилей подключения шрифтов
  let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
  // Проверяем существует ли файлы шрифтов
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      // Проверяем сущнствует ли файл стилей для подключения шрифтов
      if (!fs.existsSync(fontsFile)) {
      // Если файла нет, создаем его
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          // Записываем подключения шрифтов в файл стилей
          let fontsFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontsFileName) {
            let fontName = fontsFileName.split('-')[0] ? fontsFileName.split('-')[0] : fontsFileName;
            let fontWeigt = fontsFileName.split('-')[1] ? fontsFileName.split('-')[1] : fontsFileName;
            if (fontWeigt.toLowerCase() === 'thin') {
              fontWeigt = 100;
            } else if (fontWeigt.toLowerCase() === 'extralight') {
              fontWeigt = 200;
            } else if (fontWeigt.toLowerCase() === 'light') {
              fontWeigt = 300;
            } else if (fontWeigt.toLowerCase() === 'medium') {
              fontWeigt = 400;
            } else if (fontWeigt.toLowerCase() === 'semibold') {
              fontWeigt = 600;
            } else if (fontWeigt.toLowerCase() === 'bold') {
              fontWeigt = 700;
            } else if (fontWeigt.toLowerCase() === 'extrabold' || fontWeigt.toLowerCase() === 'heavy') {
              fontWeigt = 800;
            } else if (fontWeigt.toLowerCase() === 'black') {
              fontWeigt = 900;
            } else {
              fontWeigt = 400;
            }
            fs.appendFile(fontsFile, `@font-face { \n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontsFileName}.woff2") format("woff2"), url("../fonts/${fontsFileName}.woff") format("woff");\n\tfont-weight: ${fontWeigt};\n\tfont-style: normal;\n}\r\n`, cb);
            newFileOnly = fontsFileName;
          } 
        }      
      } else {
      // Если файл есть, выводим сообщение
      console.log("Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить")
      }
    }
  });
  
  return app.gulp.src(`${app.path.srcFolder}`);
  function cb() {}
}
