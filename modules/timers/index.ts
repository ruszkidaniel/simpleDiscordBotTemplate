import { MuteTimerClass } from "./mute";
import * as logger from 'npmlog';

export function startTimers() {
    logger.info('TIMERS', 'Starting timers.');
    MuteTimerClass.startTimer();
}