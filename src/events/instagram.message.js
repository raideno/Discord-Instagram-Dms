import configuration from '../config.loader.js';
import movechannel from "../helpers/discord.movechannel.js";
import getUserById from '../helpers/instagram.getUserById.js';
import getOrCreateChannel from '../helpers/discord.getOrCreateChannel.js';
import getOrCreateWebHook from '../helpers/discord.getOrCreateWebHook.js';

const config = configuration();

export default async (discord, instagram, { message }) => {

    const contenttype = message.item_type; /*text -> text: string | voice_media -> voice_media: {}| media -> media: {}*/
    const operation = message.op; /*add | replace | remove*/

    const authorId = message.user_id;
    if (!authorId) return console.log("[Error]: not a message");
    const author = await getUserById(instagram, authorId);

    if (!author) return console.log("[Error]: Failed to retreive the user", '(' + authorId + ')');
    if (author.username === config.INSTAGRAM_USERNAME) return console.log("[Prevent]: From loop message");

    const channel = await getOrCreateChannel(discord, authorId, author.username);
    const webhook = await getOrCreateWebHook(channel, author.full_name, author.profile_pic_url);

    movechannel(channel, 0);

    switch (operation) {
        case 'add':
            switch (contenttype) {
                case "text":
                    const text = message.text;
                    webhook.send("**.**" + text);
                    break;
                case "media":
                    const mediaUrl = message.media.image_versions2.candidates[0].url;
                    webhook.send({ files: [mediaUrl] });
                    break;
                case "voice_media":
                    const audioUrl = message.voice_media.media.audio.audio_src;
                    webhook.send({ files: [audioUrl] });
                    break;
                default:
                    webhook.send("**__[System]:__** " + contenttype + " Isn't handled by the system.");
                    break;
            }
            break;
        case 'replace':
            webhook.send("**__[System]:__**" + " He (un)reacted or did someting similar.");
            break;
        case 'remove':
            webhook.send("**__[System]:__**" + " He removed a message.");
            break;
        default:
            webhook.send("**__[System]:__** " + operation + " Isn't considered by the system.");
            console.log("[Error]:", operation, "Isn't considered by the system.");
            break;
    }

}