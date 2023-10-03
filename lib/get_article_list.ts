import { readdir } from 'node:fs/promises';

export async function getArticleList() {
  const filenames = await readdir('./articles');
  const articles = filenames.map((filename) => {
    const match = /(\d{4})-(\d{2})-(\d{2})-(.*)\.md/.exec(filename);
    if (!match)
      throw new Error(`Invalid filename '${filename}' in articles directory`);

    const [_, year, month, day, title] = match;
    return {
      filename,
      year,
      month,
      day,
      title,
    };
  });
  return articles;
}
