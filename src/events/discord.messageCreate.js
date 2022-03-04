import configuration from '../config.loader.js';
import getUserById from '../helpers/instagram.getUserById.js';

const config = configuration();
const categoryId = config.DISCORD_INSTAGRAM_DMS_CATEGORY_ID;

export default async (discord, instagram, message) => {
    if (message.author.bot || message.webhookId) return;

    const category = discord.channels.cache.get(categoryId);

    const channel = message.channel;
    if (channel.parentId !== category.id) return;

    const targetId = channel.topic;
    const target = await getUserById(instagram, targetId);
    if (!target) return console.log("[Error]:", `Invalid InstagramUserId provided in <${channel.id}> channel's topic`);

    const thread = instagram.entity.directThread([targetId]);
    await thread.broadcastText(message.content.toString());
}