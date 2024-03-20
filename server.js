const express = require('express')
const app = express()

const keys = new Set

app.use('/js', express.static('public'))

app.get('/keys', (req, res) => {
    res.json([...keys])
})

app.get('/t/:id', (req, res) => {
    const key = req.params.id.split(':')[0]
    if (keys.has(key)) {
        return res.format({
            'text/html'() {
                keys.delete(key)
                res.send(html('<div><h2>🎉🥳 You have accessed 🥳🎉<h2><h4>Try accessing the above content via Postman to win $20</h2></div>'))
            }
        })
    }

    return res.send(html('<h2><span>😛 1000 YEARS LATER... 😛</span></h2>'))
})


app.get('/V2hhdCB5YSBnb25uYSBkbz8=', (req, res) => {
    return res.format({
        'text/html'() {
            const key = (Math.random() * 999999).toFixed()
            keys.add(key)
            setTimeout(() => keys.delete(key), 5000)
            res.send(html(`<script src="/js/render-frame.js" type="module"></script>`, btoa(key))) // <iframe src="/${key}"></iframe>
        }
    })
})

app.listen(3000, () => {
    console.log('running...')
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
    * {
        text-align: center;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    </style>
    <script>
        console.log('------------------------------')
        console.log("⛔ Don't try anything here!!! ⛔")
    </script>
</head>
<body style="display: flex; justify-content: center; align-items: center;">
    ${content}
</body>
</html>
    `.trim()
}