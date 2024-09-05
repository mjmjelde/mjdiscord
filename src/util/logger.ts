import config from 'config';
import { ILogObj, Logger } from 'tslog';
const log: Logger<ILogObj> = new Logger({name: 'MjBot', minLevel: config.get("loglevel")});
export default log;