const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
/* ---------------- SERVE FRONTEND FILES ---------------- */

// Serve static files from "restro-webp" folder
app.use(express.static(path.join(__dirname, "restro-webp")));

// When user visits "/", send index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "restro-webp", "index.html"));
});


app.post("/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "saimithra0901@gmail.com",
                pass: "aqfe layw nupd vfmg"
            }
        });

        await transporter.sendMail({
            from:"saimithra0901@gmail.com",
            to: "saimithra0901@gmail.com",
            replyTo: email,
            subject: "New Contact Message - Royal Cuisine",
            text: `
Name: ${name}
Email: ${email}
Message: ${message}
            `
        });

        res.send("Message sent successfully!");
    } catch (error) {
        console.error(error);
        res.send("Error sending message");
    }
});

let orders = []; // In-memory store

app.post('/place-order', (req, res) => {
    const { amount, paymentMethod, items } = req.body;

    if(!amount || !paymentMethod || !items) {
        return res.status(400).json({ success: false, message: "Missing data" });
    }

    const orderId = Math.floor(100000 + Math.random() * 900000);
    orders.push({ orderId, amount, paymentMethod, items, status: 'pending' });

    console.log("New order:", orders[orders.length-1]);

    // For UPI, you can mark it 'paid' manually after confirmation
    res.json({ success: true, orderId });
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on port 3000");
});
