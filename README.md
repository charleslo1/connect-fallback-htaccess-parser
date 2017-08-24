# connect-fallback-htaccess-parser

a simple htaccess parser for connect-history-api-fallback

# install

```
npm install connect-fallback-htaccess-parser

```


# example

## server.js

```
import express from 'express'
import path from 'path'
import fallback from 'connect-history-api-fallback'
import htaccessParser from 'connect-history-api-fallback'

const app = express()

const htaccessFile = path.resolve(__dirname, '/public/.htaccess')

app.use(fallback({
  index: '/views/index.html',
  rewrites: htaccessParser.fromFile(htaccessFile)
}))

```


## .htaccess

```
# nginx rewrite rule

# user module rule
rewrite ^\/ucenter$                   /public/html/ucenter.html        break;
rewrite ^\/user\/login$               /public/html/login.html          break;
rewrite ^\/users\/\d+$                /public/html/user-detail.html    break;
rewrite ^\/users\/\d+\/articles$      /public/html/articles.html       break;

# other rule
rewrite ^.*\.(css|js|jpg|gif|png|woff|ttf|mp3|xls) $0                  break;
rewrite ^\/$                          /public/html/index.html          break;
rewrite ^\/([^\/]*)?                  /public/html/$1.html             break;

# end nginx rewrite rule

```
