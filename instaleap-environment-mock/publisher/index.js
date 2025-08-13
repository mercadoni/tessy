import express from "express";
import fs from "fs";
import amqp from "amqplib";

const RABBIT_URL = process.env.RABBIT_URL || "amqp://guest:guest@rabbitmq:5672";
const QUEUE = process.env.QUEUE || "orders-events";
const FILE_PATH = process.env.FILE_PATH || "/app/pickingEvent.json";

async function publishFixedMessage(msgBuffer) {
  const conn = await amqp.connect(RABBIT_URL);
  const ch = await conn.createChannel();
  await ch.assertQueue(QUEUE, { durable: true });
  await ch.sendToQueue(QUEUE, msgBuffer, { persistent: true });
  await ch.close();
  await conn.close();
}

const app = express();
app.use(express.json());

app.post("/publish", async (_req, res) => {
  try {
    const body = fs.readFileSync(FILE_PATH);
    await fetch("http://host.docker.internal:3000/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    await publishFixedMessage(body);
    res.status(204).end();
  } catch (e) {
    console.error("Publish error:", e);
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => console.log("Publisher listening on :3000"));
