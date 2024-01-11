const fs = require("fs");
const http = require("http");

// read files
function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if(err) reject(err);
            else resolve(data.toString("utf8"));
        });
    });
}

// incoming request -> server with REQUEST-HANDLER
const server = http.createServer(function serverLogicAkaRequestHandler(
    request,
    response
) {
    console.log("New Request: ", request.method, request.url);

    if(request.url === "/" || request.url === "/index"){
        readFile("./pages/index.html").then(text => {response.write(text); response.end(); console.log("New Request: ", request.method, request.url);});
    } else if(request.url === "/contact"){
        readFile("./pages/contact.html").then(text => {response.write(text); response.end();})
    } else if(request.url === "/faq"){
        readFile("./pages/faq.html").then(text => {response.write(text); response.end();})
    } else if(request.url === "/about"){
        readFile("./pages/about.html").then(text => {response.write(text); response.end();})
    } else if(request.url === "/style.css") {
        readFile("./assets/css/style.css").then(stylesheet => {response.write(stylesheet); response.end();})
    }
    // response.end(); // antworte bzw. schick die (in dem Fall leere) response aus
});

const PORT = 3001;
server.listen(PORT, () => console.log("Server ready at port: ", PORT));