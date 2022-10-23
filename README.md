# [Deploy webpages: turnkey-solution](https://v-svistunova.github.io/test/dist)


# Как пользоваться сборкой

Перед началом работы предварительно должны быть установлены Node.js, git

- создаем папку с названием проекта( в название папки не должно быть кириллицы, пробелов, символов: /,! и т.п. иначе не будет работать)

- добавляем в неё эту сборку, файлы - папки:gulp+src, gulpfile.js и package.json

- открываем проект в редакторе кода(например VScode) открываем *терминал* и пишем команду:
```
npm i
```

- дождавшись установки всех пакетов запускаем сборку в режиме разработчика:
```
npm run dev
```


# Подключение изображений и др. независимо от вложеностей папок
настройка редактора VScode: 
 - устанавливаем в редактор плагин *Path Autocomplete*
 - нажимаем **f1** и в поиске пишем *Open Seettings (JSON)*
 - добавляем в настройки:
 ```
 "path-autocomplete.pathMappings": {
    "@img": "${folder}/src/img", //alias for images
    "@scss": "${folder}/src/scss",
    "@js": "${folder}/src/js",
  },
 ```
 В режиме разаработчика работает таким образом: в путях прописываем `@img`, а редактор понимает как `${folder}/src/img` - тоесть `кореная папка проекта/src/img`.
 В уже собраный файл попадают правильные пути согласно вложености.

 # Примечания для режима разработчика

 - Скелет `index.html` находится в корне src, но разметку страницы ведем в папке *html* файлы: `head,header,footer.html`. 
 Если многостраничный сайт, создаем копию скелета `index.html` в корне(например `about.html`).
 - Для подключения стороних js-библиотек:
  - сохраняем себе установочный пакет через терминал (имя находим на сайте библиотеки во вкладке Install from NPM)
  ```
  npm i -D "имя пакета, например: swiper"
  ```
  - Подключаем при помощи импорта в файл `app.js`, и файл `style.scss` если необходимо. 
- Для работы с локальными шрифтами достаточно добавить их в папку *fonts* - сборщик **самостоятельно** произведет конвертацию и подключение в файл `fonts.scss` который импортируется в `style.scss` - нужно лишь указать нужный font-family для элемента. 
Если с течением времени надо добавить/поменять новый локальный шрифт, то следует удалить в папке *dist/scss* файл `fonts.scss` и запустить сборку в режиме разработчика заново.
- Для работы с SVG-спрайтами(множество svg-картинок склееных в одну, которые можно вызывать каждую в нужном месте) необходимо:
 - в папку *svgicons* добавить svg-иконоки .
 - запустить в терминале задачу: `npm run svgSprive`
 - переходим в папку *dist/img/icons* видим результат преобразования спрайт. в папке *stack* можно посмотреть пример как иконки подключать в формате .html.
- Для архивирования файлов в формат .zip для передачи его заказчику, нужно использовать команду в терминале 
```
npm run zip
```
- Для отправки файлов на ftp-сервер необходимо:
 - в папке *gulp/config* в файле `ftp.js` заполнить 4 поля: адрес, имя, пароль, количество потоков.
 - используем команду в терминале 
 ```
 npm run deploy
 ```