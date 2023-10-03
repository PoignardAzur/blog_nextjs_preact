import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function generateStaticParams() {
  // TODO - rewrite this function from scratch
  const filenames = await readdir("articles");

  return filenames.map(filename => {
    const match = /(\d{4})-(\d{2})-(\d{2})-(.*)\.md/.exec(filename);
    if (match == null) {
      console.error(`Filename '${filename}' does not match expected format`);
      return;
    }

    const [_, year, month, day, title] = match;
    return { year, month, day, title };
  });
}

export default async function Page(
  { params }: { params: { year: string, month: string, day: string, title: string } }
) {
  const { year, month, day, title } = params;
  const filename = `articles/${year}-${month}-${day}-${title}.md`;

  const file_contents = await readFile(filename, { encoding: "utf-8" });
  const parsed_file_contents = matter(file_contents);

  const markdown_content = await remark().use(html).process(parsed_file_contents.content);
  const datetime_string = `${year}-${month}-${day}T00:00:00+00:00`;
  return <main>
    <h1>{parsed_file_contents.data.title}</h1>
    <time dateTime={datetime_string} className="post-date">TODO - date</time>
    <article dangerouslySetInnerHTML={{ __html: markdown_content.value }} />
  </main>;
}
