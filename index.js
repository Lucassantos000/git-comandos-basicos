const fs = require('fs');
const promises = fs.promises;
const path = require('path');
const marked = require('marked');
const http = require('http');
const port = 8181;
const { readFile } = promises;

http.createServer(async (req, res) => {
  try {
    console.log(req.url);
    let url = req.url === '/' ? '/home.md' : req.url;
    
    if (!url.endsWith('.md')) {
      url = '/home.md';
    }

    if(!fs.existsSync(path.join(__dirname, url))){
      url = '/404.md';
    }
    
    const markdownPath = path.join(__dirname, url);
    const markdownContent = await readFile(markdownPath, 'utf8');
    const htmlContent = marked.parse(markdownContent);
    
    const cssPath = path.join(__dirname, 'styles.css');
    const cssContent = await readFile(cssPath, 'utf8');
    
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Markdown Viewer</title>
        <style>${cssContent}</style>
      </head>
      <body>
        <div class="wrapping-containers">

          <div class="container">
            ${htmlContent}
          </div>
          <div class="bar-right">
            <h3>Navigation</h3>
            <ul class="list-bar-right">
              <li><a href="/home.md">Home</a></li>
              <li><a href="/Readme.md">About</a></li>
              <li><a href="/404.md">404</a></li>
            </ul>
          </div>

        </div>
      </body>
      </html>
    `);
    
    return;
  } catch (err) {
    console.log(err);
    res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end('Internal Server Error');
  }
}).listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
