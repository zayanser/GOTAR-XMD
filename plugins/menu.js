const config = require('../config')
const moment = require('moment');
const { cmd, commands } = require('../command');
const os = require("os")
const { runtime } = require('../lib/functions')
const axios = require('axios')

cmd({
    pattern: "menu",
    alias: ["allmenu", "gotar"],
    use: '.menu',
    desc: "Show all bot commands",
    category: "menu",
    react: "❄️",
    filename: __filename
},
async (conn, mek, m, {
    from, sender, pushname, reply
}) => {
    try {
        function formatUptime(seconds) {
            const h = Math.floor(seconds / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            const s = Math.floor(seconds % 60);
            return `${h}h ${m}m ${s}s`;
        }

        const uptime = formatUptime(process.uptime());
        const date = new Date().toLocaleDateString('en-GB', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
        const time = moment().format('HH:mm:ss');
        const day = moment().format('dddd');

        const info = `
╭─❒ *『 𝗚𝗢𝗧𝗔𝗥-𝗫𝗠𝗗 』*
│▢ *User:* ${pushname}
│▢ *Prefix:* ${config.PREFIX}
│▢ *Time:* ${time}
│▢ *Day:* ${day}
│▢ *Date:* ${date}
│▢ *Uptime:* ${uptime}
│▢ *Version:* 1.0.0-beta
╰─────────────⧉`;

        let category = {};
        for (let cmd of commands) {
            if (!cmd.category) continue;
            if (!category[cmd.category]) category[cmd.category] = [];
            category[cmd.category].push(cmd);
        }

        const keys = Object.keys(category).sort();
        let print = info + '\n' + String.fromCharCode(8206).repeat(4001);

        for (let k of keys) {
            print += `\n\n╭━──〔 *${k.toUpperCase()}* 〕──`;
            const cmds = category[k].sort((a, b) => a.pattern.localeCompare(b.pattern));
            cmds.forEach((cmd) => {
                const usage = cmd.pattern.split('|')[0];
                print += `\n┃ ⬡ ${usage}`;
            });
            print += `\n╰──────────────❒`;
        }

        const footer = "\n\n> *© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ɢᴏᴛᴀʀ ᴛᴇᴄʜ*";
        const fullText = print + footer;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/82b8gr.jpg` },
                caption: fullText,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363401658098220@newsletter',
                        newsletterName: "𝗚𝗢𝗧𝗔𝗥-𝗫𝗠𝗗",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error(e);
        reply(`❌ Erreur dans la commande menu : ${e.message}`);
    }
});
