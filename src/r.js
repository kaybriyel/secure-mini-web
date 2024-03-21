
(() => {
    delete window.fetch
    delete window.XMLHttpRequest
    delete window.eval
    parent.document
    const key = 'name'
    const get = name => document.querySelector(name)
    const shadow = document.body.attachShadow({ mode: "open" });
    const iframe = document.createElement("iframe");
    shadow.appendChild(iframe);
    iframe.src = `t/${atob(get(`[${key}=sid]`).content)}:${uuid}`
    iframe.style.border = 'none'
    iframe.width = '100%'
    iframe.height = '100%'
})()