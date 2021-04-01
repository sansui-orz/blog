rm -r public/article
rm -r public/imgs

mkdir public/article
mkdir public/imgs

node generatorArticle/markdown2html.js

cp -R ../articles/imgs public