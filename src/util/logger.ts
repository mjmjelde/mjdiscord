import { get } from 'config';
import { Logger } from 'tslog';
const log: Logger = new Logger({name: 'MjBot', minLevel: get("loglevel")});
export default log;