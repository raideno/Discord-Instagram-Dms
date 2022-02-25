import { Client, Intents } from "discord.js";
import { configuration } from "../config.loader.js";

const createclient = () => {
    const client = new Client({
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
    });
    client.login(configuration().DISCORD_TOKEN);
    return client;
}

export default createclient;