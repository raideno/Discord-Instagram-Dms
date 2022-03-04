import configuration from "./config.loader.js";

const config = configuration();

const categoryId = config.DISCORD_INSTAGRAM_DMS_CATEGORY_ID;

export default (discord, instagram) => {
    const errors = [];
    const category = discord.channels.cache.get(categoryId);
    if (!category || category.type !== "GUILD_CATEGORY") {
        errors.push({
            type: 0,
            description: `<${categoryId}> isn't a category.`
        });
    };
    return [errors, errors.length === 0];
}