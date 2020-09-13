import { join } from "path";
import { existsSync, mkdirSync } from "fs";

export function baseDir(): string {
    return process.cwd();
}

export function tmpDir(): string {
    return join(baseDir(), 'tmp');
}

export function dataDir(): string {
    let dir = join(baseDir(), 'data');
    if(!existsSync(dir)) {
        mkdirSync(dir);
    }
    return dir;
}