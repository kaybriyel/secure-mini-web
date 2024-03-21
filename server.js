const express = require('express')
const app = express()

const keys = new Set

app.use((req, res, next) => {
    // const date = (new Date).toLocaleString('km-KH', { timeZone: 'Asia/Phnom_Penh' })
    console.log(req.ip, req.header('x-forwarded-for'), req.url, req.headers.accept, req.headers.origin, req.headers.referer, req.headers['user-agent'], '\n')
    next()
})

app.use('/', express.static('public'))

app.get('/keys', (req, res) => {
    res.json([...keys])
})

app.get('/t/:id', (req, res) => {
    const key = req.params.id.split(':')[0]
    if (keys.has(key)) {
        return res.format({
            'text/html'() {
                keys.delete(key)
                res.send(html(success()))
            }
        })
    }

    return res.send(html('<div><h2><span>😛 1000 YEARS LATER... 😛</span></h2><h2><span>🙂 YOU SHOULD NEVER GIVE UP 🙂</span></h2></div>'))
})


app.get('/V2hhdCB5YSBnb25uYSBkbz8=', (req, res) => {
    return res.format({
        'text/html'() {
            const key = (Math.random() * 999999).toFixed()
            keys.add(key)
            setTimeout(() => keys.delete(key), 5000)
            res.send(html(`<script src="/js/script.js" type="module"></script>`, btoa(key))) // <iframe src="/${key}"></iframe>
        }
    })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('running at port', port)
})

function html(content = '', token = '') {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    
    <title>Mini Web</title>
    <base href="/">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'">
    <meta name="viewport"
    content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="sid" content="${token}">
    <meta name="format-detection" content="telephone=no" />
    <meta name="msapplication-tap-highlight" content="no" />
    <meta name="color-scheme" content="light dark" />

  <!-- add to homescreen for ios -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="Mini Web" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <script>const uuid = ${Date.now()}</script>
    <style>
    html, body {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        font-family: monospace;
    }
    * {
        text-align: center;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    </style>
    <script>
        setInterval(() => {
            console.clear()
            console.log('------------------------------')
            console.log("⛔ Don't try anything here!!! ⛔")
        }, 1000)
        </script>
        </head>
        <body style="display: flex; justify-content: center; align-items: center;">
        ${content}
        <div style="position: fixed; bottom: 1em;">© 2024 All rights reserved by KAY BRIYEL</div>
</body>
</html>
    `.trim()
}

function success() {
    return `
<style>
#qr-url {
    position: relative;
    height: 200px;
    background-image: url(img/qr-url.png);
    background-repeat: no-repeat;
    background-position: center;
    margin-bottom: 3em;
}
#qr-url::after {
    content: 'https://secure-mini-web.onrender.com/V2hhdCB5YSBnb25uYSBkbz8=';
    position: absolute;
    width: 100%;
    left: 0;
    bottom: -2em;
}
</style>
<div>
    <div id="qr-url"></div>
    <h2>🎉🥳 You have accessed the advanced security zone🥳🎉<h2>
    <h4>Try extracting the contents automatically via Scraping Tool, API or Postman</h2>
    <h4>Break it if you can</h2>
</div>
<script>
delete fetch
delete eval
delete XMLHttpRequest
</script>
    `.trim()
}