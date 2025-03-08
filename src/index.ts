import app from "./app.js";

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
    console.log("Listening to PORT:" + PORT);
});
