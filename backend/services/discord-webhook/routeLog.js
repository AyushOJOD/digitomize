// webhookUtils.js
import { EmbedBuilder, WebhookClient } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();


function sendRequestLog(req) {
    const webhookClient = new WebhookClient({ url: process.env.DC_WH_ROUTE });
    const headersDescription = 'Headers:\n```json\n' + JSON.stringify(req.headers, null, 2) + '```';

    const embed = new EmbedBuilder()
        .setTitle('Request Log')
        .setColor(0x0099FF)
        .setTimestamp()
        .setFooter({ text: String(req.originalUrl) })
        .addFields(
            { name: 'Request Method', value: req.method, inline: true },
            { name: 'Request URL', value: req.originalUrl, inline: true },
            { name: 'Query Parameters', value: '```json\n' + JSON.stringify(req.query, null, 2) + '```', inline: false },
            { name: 'Request Body', value: '```json\n' + JSON.stringify(req.body, null, 2) + '```', inline: false },
            { name: 'IP Address', value: req.ip, inline: true },
            { name: 'User Agent', value: req.get('User-Agent'), inline: true },
        )
        .setDescription(headersDescription);

    webhookClient.send({
        username: 'Route logging | digitomize',
        avatarURL: "https://res.cloudinary.com/dsazw0r59/image/upload/logo_bg_y5ixum.jpg",
        embeds: [embed],
    });
}

export { sendRequestLog };