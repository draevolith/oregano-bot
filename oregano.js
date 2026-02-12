// oregano.js
require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

// Bot online
client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

// Welcome new members
client.on('guildMemberAdd', async (member) => {
    const SERVER_ID = '1420844988492943382';          // Replace with your server ID
    const WELCOME_CHANNEL_ID = '1420844991848386648'; // Replace with your welcome channel ID

    // Only run if the member joined your specific server
    if (member.guild.id !== SERVER_ID) return;

    const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
    if (!channel) return;

    const welcomeEmbed = new EmbedBuilder()
        .setColor(0x3498db)
        .setTitle('🎉 Welcome to the Server!')
        .setDescription(`Hey ${member}, welcome to **${member.guild.name}**!`)
        .setImage(member.user.displayAvatarURL({ dynamic: true, size: 1024 })) // BIG PFP
        .setFooter({ text: 'Enjoy your stay!' })
        .setTimestamp();

    channel.send({ embeds: [welcomeEmbed] });
});

// Login using .env token
client.login(process.env.TOKEN);
