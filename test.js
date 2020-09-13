const rsswatcher = require('./dist/lib/rss_watcher');

const w = new rsswatcher.RSSWatcher('https://www.rotowire.com/rss/news.php?sport=NFL');
w.on('item', (item) => {
  console.log(`${item.title}:${item.link}`);
})