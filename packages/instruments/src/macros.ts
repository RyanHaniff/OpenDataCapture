import fs from 'fs';

export function importInstrumentSource(relativePath: string) {
  const filepath = Bun.resolveSync(`./${relativePath}`, import.meta.dir);
  return fs.readFileSync(filepath, 'utf-8');
}
