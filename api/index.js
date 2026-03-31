const express = require('express');
const os = require('os');
const amqp = require('amqplib');
const http = require('http');

const app = express();
app.set('trust proxy', true);

let channel;

// 🔁 Connect to RabbitMQ with retry
async function connectQueue() {
  try {
    const connection = await amqp.connect('amqp://rabbitmq');
    channel = await connection.createChannel();
    await channel.assertQueue('requests');

    console.log('✅ Connected to RabbitMQ');
  } catch (err) {
    console.log('❌ RabbitMQ not ready, retrying...');
    setTimeout(connectQueue, 3000);
  }
}

connectQueue();

// 🚀 API route (Producer)
app.get('/', (req, res) => {
  if (!channel) {
    return res.status(500).json({ error: 'Queue not ready' });
  }

  const msg = JSON.stringify({
    ip: req.ip,
    time: Date.now()
  });

  channel.sendToQueue('requests', Buffer.from(msg));

  res.json({
    status: 'queued',
    pod: os.hostname()
  });
});

// ⚡ HTTP server with keep-alive tuning
const server = http.createServer(app);

// Keep-alive optimization
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;

// Increase connection capacity
server.maxConnections = 10000;

// Start server
server.listen(3000, () => {
  console.log('🚀 API running on port 3000');
});
