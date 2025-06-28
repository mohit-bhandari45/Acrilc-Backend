import server from "./app.js";
import os from "os";

const PORT = Number(process.env.PORT) || 5000;

server.listen(PORT, "0.0.0.0", async () => {
    console.log(`✅ Server is live and listening on port bro! ${PORT}`);

    const interfaces = os.networkInterfaces();
    console.log("🔹 Access the server at:");
    Object.values(interfaces).forEach((ifaceList) => {
        ifaceList?.forEach((iface) => {
            if (iface.family === "IPv4" && !iface.internal) {
                console.log(`   • http://${iface.address}:${PORT}`);
            }
        });
    });

    console.log(`   • http://localhost:${PORT}`);
});
