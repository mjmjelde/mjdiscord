import config, { get } from "config";

console.log(config.get('tenor.apikey'))
console.log(config.util.getConfigSources())