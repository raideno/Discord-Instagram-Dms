import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const filematch = new RegExp(".*\..*\.js");
const eventsdir = path.join(__dirname, "events");


const formatFiles = (files = []) => {
    files = files.filter((file) => filematch.test(file));
    files = files.map((file) => {
        const [eventtype, eventname] = file.split(".");
        return {
            name: eventname,
            type: eventtype,
            absolutepath: path.join(eventsdir, file),
        }
    });
    return files;
}

export default (discord, instagram) => {
    const files = fs.readdirSync(eventsdir);
    const events = formatFiles(files);
    events.forEach(async (event) => {
        const eventfile = (await import(event.absolutepath)).default;
        switch (event.type) {
            case 'discord':
                discord.on(event.name, eventfile.bind(null, discord, instagram));
                break;

            case 'instagram':
                instagram.realtime.on(event.name, eventfile.bind(null, discord, instagram));
                break;

            default:
                console.error("Unknown Event Type:", event.type);
                break;
        }
    });
    return events;
}