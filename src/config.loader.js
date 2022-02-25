import dotenv from 'dotenv';

dotenv.config();

export const configuration = () => {
    const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
    const INSTAGRAM_USERNAME = process.env.INSTAGRAM_USERNAME;
    const INSTAGRAM_PASSWORD = process.env.INSTAGRAM_PASSWORD;
    const DISCORD_INSTAGRAM_DMS_CATEGORY_ID = process.env.DISCORD_INSTAGRAM_DMS_CATEGORY_ID;
    return {
        DISCORD_TOKEN,
        INSTAGRAM_USERNAME,
        INSTAGRAM_PASSWORD,
        DISCORD_INSTAGRAM_DMS_CATEGORY_ID
    }
}

export default configuration;