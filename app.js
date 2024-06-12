const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT_URL = 3500;
const { mimeTypes } = require("./utils/index");

function staticFile(response, filePath, exp) {
  response.setHeader("Content-Type", mimeTypes[exp]);
  fs.readFile("./public/" + filePath, {}, (error, data) => {
    if (error) {
      response.statusCode = 404;
      response.end();
    } else {
      response.end(data);
    }
  });
}

http
  .createServer(function (request, response) {
    const { url } = request;
    switch (url) {
      case "/contact":
        console.log("contact");
        staticFile(response, "index.html", ".html");
        break;
      default:
        const extname = String(path.extname(url)).toLocaleLowerCase();
        if (extname in mimeTypes) {
          staticFile(response, url, extname);
        } else {
          response.statusCode = 404;
          response.end();
        }
    }
  })
  .listen(PORT_URL);
