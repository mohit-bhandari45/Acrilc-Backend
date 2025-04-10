import server from "./app.js";

const PORT = Number(process.env.PORT) || 5000;

server.listen(PORT, () => {
    console.log("Live at http://localhost:" + PORT);
});
