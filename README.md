I'm trying to write vite config for many things.

### TODO LiST:
 - rename .eslintrc.json to .eslintrc and try to use import/no-unresolved
 - optimize images
 - SSR
 - lazy imports
 - output dir
 - change static folder
 - css chunks
 - HMR
 - TerserPlugin
 - CopyWebpackPlugin
 - polyfills.js
 - pre commit hook

### Что не было сделано:
 - import/no-unresolved - не получилось (не очень понятно даже зачем нужно)
   eslint-import-resolver-typescript и eslint-import-resolver-vite - не сработали
 - autoprefixer с разделением на prod и dev. Вообще странно это разделять.
   Можно баги не заметить из-за префиксов