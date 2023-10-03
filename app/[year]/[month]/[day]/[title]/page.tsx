import { readFile } from 'fs/promises';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

import { getArticleList } from '../../../../../lib/get_article_list';

export async function generateStaticParams() {
  return await getArticleList();
}

export default async function Page(
  { params }: { params: { year: string, month: string, day: string, title: string } }
) {
  const { year, month, day, title } = params;
  const filename = `articles/${year}-${month}-${day}-${title}.md`;
  const date = new Date(`${year}-${month}-${day}`);

  const file_contents = await readFile(filename, { encoding: "utf-8" });
  const parsed_file_contents = matter(file_contents);
  const markdown_content = await remark().use(html).process(parsed_file_contents.content);

  const datetime_string = `${year}-${month}-${day}T00:00:00+00:00`;
  const formatted_date = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return <main>
    <h1>{parsed_file_contents.data.title}</h1>
    <time dateTime={datetime_string} className="post-date">{formatted_date}</time>
    <article dangerouslySetInnerHTML={{ __html: markdown_content.value }} />
  </main>;
}
