import configuration from './config.loader.js';
import DiscordClient from './clients/discord.client.js';
import InstagramClient from './clients/instagram.client.js';

const config = configuration();

const discord = await DiscordClient();
const instagram = await InstagramClient();

if (!discord) process.exit(1);
if (!instagram) process.exit(2);

console.log("[Discord]:", discord.user.username);
console.log("[Instagram]:", instagram.me.username);

instagram.realtime.on("message", async (event) => {
    const categoryId = config.DISCORD_INSTAGRAM_DMS_CATEGORY_ID;
    const category = discord.channels.cache.get(categoryId);
    if (!category || category.type !== "GUILD_CATEGORY") return console.log("[Error]", `<${categoryId}> isn't a category.`);
    const authorId = event.message.user_id;
    if (!authorId) return console.log("[Error]: not a message");
    let author = null;
    try {
        author = await instagram.user.info(authorId);
    } catch (error) {
        console.log("[Error]: Failed to retreive the user", '(' + authorId + ')');
    }
    if (!author) return console.log("[Error]: Failed to retreive the user", '(' + authorId + ')');
    if (author.username === config.INSTAGRAM_USERNAME) return console.log("[Prevent]: From loop message");
    const content = event.message.text;
    const channel = category.guild.channels.cache.find((channel) => channel.parentId === categoryId && channel.topic == authorId);
    if (channel) {
        const webhooks = await channel.fetchWebhooks();
        if (webhooks.size !== 0) return webhooks.values().next().value.send(content);
        const webhook = await channel.createWebhook(author.full_name, {
            avatar: author.profile_pic_url,
            reason: null
        });
        webhook.send("-" + content);
    } else {
        const createdchannel = await category.createChannel(author.username, {
            type: 'GUILD_TEXT',
            topic: authorId,
        });
        const webhook = await createdchannel.createWebhook(author.full_name, {
            avatar: author.profile_pic_url,
            reason: null
        });
        webhook.send("-" + content);
    }
});

discord.on("messageCreate", async (message) => {
    if (message.author.bot || message.webhookId) return;
    const categoryId = config.DISCORD_INSTAGRAM_DMS_CATEGORY_ID;
    const category = discord.channels.cache.get(categoryId);
    if (!category || category.type !== "GUILD_CATEGORY") return console.log("[Error]", `<${categoryId}> isn't a category.`);
    const channel = message.channel;
    if (channel.parentId !== category.id) return;
    const targetId = channel.topic;

    let target = null;
    try {
        target = await instagram.user.info(targetId);
    } catch (error) {
        console.log("[Error]: Failed to retreive the user", '(' + targetId + ')');
    }
    if (!target) return console.log("[Error]:", `Invalid InstagramUserId provided in <${channel.id}> channel's topic`);

    const thread = instagram.entity.directThread([targetId]);
    await thread.broadcastText(message.content.toString());
});