import configuration from "../config.loader.js";

const config = configuration();
const categoryId = config.DISCORD_INSTAGRAM_DMS_CATEGORY_ID;

/*change the function to get any channel with anything not just the topic*/
/*and also to maje it genric, not just for the above categoryId*/
export default async (discord, topic, name) => {
    const channel = discord.channels.cache.find((channel) => channel.parentId === categoryId && channel.topic == topic);
    if (channel) return channel;
    const category = discord.channel.cache.find((channel) => channel.id === categoryId);
    const createdchannel = await category.createChannel(name, {
        type: 'GUILD_TEXT',
        topic,
    });
    return createdchannel;
}