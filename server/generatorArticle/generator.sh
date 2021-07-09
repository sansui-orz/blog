rm -r server/public/article
rm -r server/public/imgs

mkdir server/public/article
mkdir server/public/imgs

ts-node server/generatorArticle/markdown2html.ts

# cp -R ./articles/imgs server/public