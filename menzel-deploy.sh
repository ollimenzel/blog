#Create my Hugo blog and deploy it to my server
hugo -t hugo-theme-stack
#sync with github repo and push "blog" and "public" directories
git add .
git commit -m "update blog"
git push