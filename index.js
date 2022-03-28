const http = require("http");
const app = require("./app");

const port = 8080 || process.env.PORT;

console.log(__dirname);
console.log(__filename);

const server = http.createServer(app);

server.listen(process.env.PORT || 8080, () => {
    console.log("Server started !");
});