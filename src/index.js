import postcheck from './post.check.js';
import eventsloader from './events.loader.js';
import DiscordClient from './clients/discord.client.js';
import InstagramClient from './clients/instagram.client.js';

const discord = await DiscordClient();
const instagram = await InstagramClient();

if (!discord) process.exit(1);
if (!instagram) process.exit(2);

const [errors, post] = postcheck(discord, instagram);

if (!post) process.exit(-1);

console.log("[Instagram]:", instagram.me.username);

const events = eventsloader(discord, instagram);