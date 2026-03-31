const amqp = require('amqplib');

async function start() {
  try {
    const connection = await amqp.connect('amqp://rabbitmq');
    const channel = await connection.createChannel();

    await channel.assertQueue('requests');

    console.log('✅ Worker connected to RabbitMQ');

    channel.consume('requests', (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString());

        console.log('📦 Processing:', data);

        // simulate work
        setTimeout(() => {
          channel.ack(msg);
        }, 100);
      }
    });

  } catch (err) {
    console.log('❌ Worker retrying RabbitMQ connection...');
    setTimeout(start, 3000);
  }
}

start();
