const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const flag = process.env.FLAG || "HCSE*PhiloSci{you3inmy5pla6ce7}";

const commonStyle = `
<style>
    body { background: #0f172a; color: #f8fafc; font-family: sans-serif; margin: 0; padding: 0; display: flex; flex-direction: column; min-height: 100vh; }
    nav { background: #1e293b; padding: 15px 30px; display: flex; gap: 20px; }
    nav a { color: #38bdf8; text-decoration: none; font-weight: bold; }
    nav a:hover { color: #0ea5e9; }
    .content { flex: 1; display: flex; justify-content: center; align-items: center; padding: 20px; }
    .container { background: #1e293b; padding: 40px; border-radius: 12px; box-shadow: 0px 4px 15px rgba(0,0,0,0.4); width: 450px; text-align: center; }
    h1 { color: #38bdf8; margin-top: 0; font-size: 26px; }
    p { color: #94a3b8; line-height: 1.6; }
    form { display: flex; gap: 10px; margin-top: 20px; }
    input[type="text"] { flex: 1; padding: 12px; border: none; border-radius: 8px; background: #334155; color: #fff; outline: none; font-size: 15px; }
    input[type="submit"] { background: #38bdf8; color: #0f172a; font-weight: bold; padding: 12px 20px; border: none; border-radius: 8px; cursor: pointer; transition: background 0.2s; }
    input[type="submit"]:hover { background: #0ea5e9; }
    .result-box { margin-top: 25px; padding: 15px; background: #0f172a; border-left: 4px solid #38bdf8; border-radius: 4px; text-align: left; }
    .hint { margin-top: 20px; font-size: 12px; color: #64748b; }
</style>
`;

const navbar = `
<nav>
    <a href="/">Dashboard</a>
    <a href="/support">Support System</a>
</nav>
`;

app.get("/", (req, res) => {
    res.send(`<!DOCTYPE html><html><head><title>Secure Corp</title>${commonStyle}</head><body>${navbar}<div class="content"><div class="container"><h1>Welcome to Secure Corp Internal Portal</h1><p>Our support tracking platform is online. If you face any technical issues with your endpoints, please use our Support System to query your ticket ID.</p></div></div></body></html>`);
});

app.get("/support", (req, res) => {
    const query = req.query.query || "";
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Support System</title>
        ${commonStyle}
    </head>
    <body>
        ${navbar}
        <div class="content">
            <div class="container">
                <h1>Ticket Tracking System</h1>
                <p>Enter your Ticket ID or Search Keywords to trace your issue status.</p>
                <form method="GET" action="/support">
                    <input type="text" name="query" placeholder="e.g., TICKET-9923" required autocomplete="off">
                    <input type="submit" value="Search">
                </form>
                ${query ? `
                    <div class="result-box">
                        <p>Search results for: <strong>${query}</strong></p>
                        <p style="color: #f87171;">⚠️ No tickets found matching your query.</p>
                    </div>
                ` : ""}
                <p class="hint">Note: If you have an administrative bypass cookie, the system will render the Flag on alert().</p>
            </div>
        </div>
        <script>
            window.oldAlert = window.alert;
            window.alert = function(msg) {
                window.oldAlert("XSS Success! Here is your Flag: " + "${flag}");
            };
        </script>
    </body>
    </html>
    `);
});

app.listen(port, () => {
    console.log(`XSS challenge running on port ${port}`);
});