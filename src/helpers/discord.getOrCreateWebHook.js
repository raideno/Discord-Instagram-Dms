export default async (channel, name, avatar) => {
    const webhooks = await channel.fetchWebhooks();
    if (webhooks.size !== 0) return webhooks.values().next().value;
    const webhook = await channel.createWebhook(name, {
        avatar,
        reason: null
    });
    return webhook;
}