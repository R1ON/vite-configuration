I'm trying to write vite config for many things.

### TODO LiST:
 - SSR (middlewares, etc)
 - SSR проверить hydrateRoot
 - lazy imports
 - output dir
 - change static folder
 - css chunks
 - HMR
 - CopyWebpackPlugin
 - polyfills.js
 - pre commit hook
 - bundle analyzer

### Что не было сделано:
 - import/no-unresolved - не получилось (не очень понятно даже зачем нужно)
   eslint-import-resolver-typescript и eslint-import-resolver-vite - не сработали
 - autoprefixer с разделением на prod и dev. Вообще странно это разделять.
   Можно баги не заметить из-за префиксов


### Что мы получали?
 - Отрефакторенный файл конфигурации (теперь его можно легко исправить)
 - Оптимизатор SVG (теперь не нужно оптимизировать иконки вручную)
 - React.lazy вместо universal компонентов (хипстерское нововведение)
 - NodeJS новой версии (теперь можно устанавливать свежие модули)
 - Удалил миллион Webpack плагинов (теперь не нужно обновлять по отдельности этот миллион плагинов и бояться, что что-то сломается)
 - Ускоренная сборка/билд проекта (теперь не нужно ждать минуту для запуска и 5 для билда)
 - Более простой SSR (теперь он легче читается и воспринимается)
 - Нормальный HRM (теперь он работает не только для css'a)