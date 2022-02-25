# Instagram To Discord Dms:

This bot can retreive your Instagram messages in realtime and send them back to a discord server of your choice.

## Configuration:

Create a `.env` file in the **root directory** of the project

```env
INSTAGRAM_USERNAME = your_username
INSTAGRAM_PASSWORD = your_password

DISCORD_TOKEN = discord_bot_token
DISCORD_OWNER_ID = your_discord_id
DISCORD_INSTAGRAM_DMS_CATEGORY_ID = discord_category_id
```

After invite the bot into your server and start it with

```
npm run prod
```

And stop it with this command

```
npm run stop
```

To see the Bot Status run this command

```
npm run status
```
