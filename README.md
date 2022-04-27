# The-Assistant

> This is a bot made for Scheduling Event on Discord

> Autor: [Aasjiel](https://github.com/Aasjiel) <br>
> Base: [Fynnyx/BasicBot-discord.js](https://github.com/Fynnyx/BasicBot-discord.js)

## Documentation

---

### Available Scripts

#### `node index.js || nodemon`

Launches the app on your server. After making changes to the Code rerun node index.js again. <br> To cricumvent this I recommend using nodemon, for automatic restarts and better error logging for Discord js

### Available Bot Commands

#### `/help`

is used to get all available commands of this bot and some further information.

#### `/event`

is used as the base command for most of the major features of this bot.

     Available Subcommands:
        /add => lets you add a new Event (max 100 at the same time) 
        /find => lets you find events with a certain name and or id
        /edit => lets you edit an existing event by providing the id
        /delete => lets you delete an event identified by its id
        /findall => WIP
        /addSeries => Coming Soon
        
### Not yet implemented

#### `/group`

make groups from a given number of server users for games etc. by providing the size and criteria of participants

#### `/settings`

change configration of things like colour of embeds from the bot etc.
