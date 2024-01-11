const fs = require("fs");
const http = require("http");

// read file
function readFile (path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

// incoming request -> server mit request-handler
const server = http.createServer(function serverHandler (request, response) {

    let filePath = "";
    const adress = request.url 

    if(request.url === "/"){
        
        readFile('./pages/index.html').then(text => {response.write(text); response.end()});
    
    // transfer files dynamically
    } else if (adress.includes("img")) { 
        console.log(adress.split("/"));
        const adressArr = adress.split("/");

        filePath = adressArr[2];

        readFile(`./assets/img/${filePath}`).then(img => { 
            response.write(img), 
            response.end() });
    } else if (adress.includes("page")) {
        console.log(adress.split("/"));
        const adressArr = adress.split("/");

        filePath = adressArr[2];

        readFile(`./pages/${filePath}`).then(text => { 
            response.write(text); 
            response.end();
        });
    // transfer style
    } else if(request.url === "/style"){
        readFile("./assets/scss/style.scss").then(stylesheet => {
            response.write(stylesheet);
            response.end();
        });
    // transfer fonts
    } else if(request.url === "/font/nunito_variable_font_wght.ttf"){
        readFile("./assets/font/nunito_variable_font_wght.ttf").then(font => {
            response.write(font);
            response.end();
        });
    };
});

// server listens on port 3000
const PORT = 3000;
server.listen(PORT, console.log("Server ready at PORT: ", PORT));