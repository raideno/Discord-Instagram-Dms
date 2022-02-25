import { withRealtime } from 'instagram_mqtt';
import { configuration } from "../config.loader.js";
import { IgApiClient as Client } from 'instagram-private-api';

const config = configuration();

const createclient = async () => {

    const client = withRealtime(new Client());

    client.state.generateDevice(config.INSTAGRAM_USERNAME);

    const user = await client.account.login(config.INSTAGRAM_USERNAME, config.INSTAGRAM_PASSWORD);

    if (!user) return null;
    else client.me = user;

    await client.realtime.connect({ irisData: await client.feed.directInbox().request() });

    return client;
}

export default createclient;