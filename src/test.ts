import * as ytdl from 'ytdl-core';
import { createWriteStream } from 'fs';

ytdl('https://www.youtube.com/watch?v=2jmfcW0WP94', {quality: 'highestaudio', filter: 'audioonly'}).pipe(createWriteStream('video-audio.mp4'))
// ytdl.getInfo('https://www.youtube.com/watch?v=2jmfcW0WP94').then((data) => {
//   let formats = ytdl.filterFormats(data.formats, 'audioonly');
//   console.log(formats.length);
//   console.log(JSON.stringify(formats));
// })