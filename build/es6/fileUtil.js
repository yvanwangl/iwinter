import * as fs from 'fs';
import * as path from 'path';
export function scanDir(dir) {
    if (!path.isAbsolute(dir)) {
        let rootDir = getRootDir();
        dir = path.join(rootDir, dir);
    }
    if (!fs.existsSync) {
        console.error(`Can not find directory: ${dir}`);
    }
    let files = fs.readdirSync(dir);
    let result = new Array();
    files.map(file => {
        let filePath = path.join(dir, file);
        let stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            result = [...result, ...scanDir(filePath)];
        }
        else if (stat.isFile()) {
            result.push(filePath);
        }
    });
    return result;
}
export function getRootDir() {
    return path.resolve(__dirname, '../');
}
;
//# sourceMappingURL=fileUtil.js.map