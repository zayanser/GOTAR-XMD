const { cmd } = require('../command');
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "ping",
    alias: ["speed", "test"],
    desc: "Show bot uptime with stylish formats",
    category: "main",
    react: "⏱️",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const uptime = runtime(process.uptime());
        const now = new Date();
        const startTime = new Date(now - process.uptime() * 1000);
        
        const time = now.toTimeString().split(' ')[0]; // HH:MM:SS
        const date = now.toLocaleDateString('en-GB'); // DD/MM/YYYY

        const style1 = `▰▰▱▱▱▱▱▱▱▱
*🟢 ONLINE*

⚡ *Uptime:* ${uptime}
📌 *Started At:* ${startTime.toLocaleString()}
⏰ *Current Time:* ${time}
📅 *Date:* ${date}

💻 *Developer:* Gotar Tech
🤖 *Bot Name:* GOTAR-XMD

🌟 Don't forget to star & fork the repo!
🔗 https://github.com/gotartech/GOTAR-XMD

▰▰▱▱▱▱▱▱▱▱

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ɢᴏᴛᴀʀ ᴛᴇᴄʜ*`;

        await conn.sendMessage(from, { 
            text: style1,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363401658098220@newsletter',
                    newsletterName: config.OWNER_NAME || '𝐆𝐎𝐓𝐀𝐑 𝐗𝐌𝐃',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Uptime Error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
