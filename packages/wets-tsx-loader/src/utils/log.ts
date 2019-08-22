import * as fs from 'fs';
import * as path from 'path';

export function write(fileName: string, content: any) {
  if (process.env.NODE_ENV !== 'dev') {
    return;
  }
  if (!fs.existsSync(path.resolve(__dirname, '../../debug/'))) {
    fs.mkdirSync(path.resolve(__dirname, '../../debug/'));
  }
  fs.writeFileSync(
    path.resolve(__dirname, '../../debug/' + fileName),
    JSON.stringify(content, null, 2),
  );
}
