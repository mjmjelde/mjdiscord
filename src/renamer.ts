import * as fs from 'fs';
import { dataDir } from './util/data';

fs.readdir(process.argv[2], (err, files) => {
  for(var i = 0; i < files.length; i++) {
    var file = fs.readFileSync(`${process.argv[2]}/${files[i]}`);
    if(file[0] == 111) {
      fs.writeFileSync(`${dataDir()}/${i}.jpeg`, file.slice(8));
    } else {
      fs.writeFileSync(`${dataDir()}/${i}.mpeg`, file);
    }
  }
})