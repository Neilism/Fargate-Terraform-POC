import express from 'express';
import http from 'http';
import path from 'path';

const SERVER_PORT = 3000;
const APP_VERSION = "1.0.0" ;




export function getVersion() {
    const router = new express.Router();

    router.get('/', (req, res) => {
        res.status(200);
        res.json({"Current App Version is" : APP_VERSION });
    });

    return router;
};


export function server() {
    console.log(`Server is listeninig on port ${SERVER_PORT}`);
    const routes = {
        '/version': getVersion(),
    };

  return createServer(routes);
}

export function createServer(routes) {

    const app = express();
    Object.keys(routes).forEach(routeName => {
        app.use(routeName, routes[routeName]);
    });
    app.use(express.static('resource'))
    const server = http.createServer(app);
    server.listen(SERVER_PORT);

    return server;
}

const __dirname = path.resolve();
server();
