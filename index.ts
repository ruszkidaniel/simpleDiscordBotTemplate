require('dotenv').config()

import { DiscordBot } from './bot';
import { Database } from './modules/database';
import { startTimers } from './modules/timers';
import * as logger from 'npmlog';

logger.info('APP', 'Starting Discordbot & Database');
DiscordBot.getInstance();
Database.getInstance();
startTimers();