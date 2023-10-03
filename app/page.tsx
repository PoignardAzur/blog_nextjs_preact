import { readFile } from 'fs/promises';
import { remark } from 'remark';
import html from 'remark-html';

export default async function Page() {
  const about_contents = await readFile("assets/about.md", { encoding: "utf-8" });
  const hireme_contents = await readFile("assets/hireme.md", { encoding: "utf-8" });

  const about_contents_md = await remark().use(html).process(about_contents);
  const hireme_contents_md = await remark().use(html).process(hireme_contents);

  return <main>
    <article dangerouslySetInnerHTML={{ __html: about_contents_md.value }} />
    <article dangerouslySetInnerHTML={{ __html: hireme_contents_md.value }} />
  </main>
}
