import { ApiExpress } from "./infra/api/express/api.express";

function main() {
    // API
    const api = ApiExpress.create([]);
    const port = 3000;

    api.start(port);
}

main();
