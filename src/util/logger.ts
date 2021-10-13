import config from 'config';
import { Logger } from 'tslog';
const log: Logger = new Logger({name: 'MjBot', minLevel: config.get("loglevel")});
export default log;