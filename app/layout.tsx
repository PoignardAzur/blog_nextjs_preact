import { getArticleList } from '../lib/get_article_list';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const article_list = await getArticleList();

  return (
    <html lang="en">
      <head>
        <title>PoignardAzur - Developer blog of Olivier Faure</title>
        <link rel="stylesheet" href="/styles.css" />
        <style></style>
      </head>

      <body>
        <header>
          <a href="/" className="banner-link">
            <h1>PoignardAzur</h1>
            <p>Developer blog of Olivier Faure</p>
          </a>
        </header>
        {children}
        <aside>
          <h1>Latest posts</h1>
          <nav>
            <ul>
              {
                article_list.map((article) => {
                  const { year, month, day, title } = article;
                  const date = new Date(`${year}-${month}-${day}`);
                  const formatted_date = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                  const datetime_string = `${year}-${month}-${day}T00:00:00+00:00`;
                  const article_url = `/${year}/${month}/${day}/${title}`;

                  return <li key={article_url}><a href={article_url}>
                    {article.title}
                    {" "}
                    <small><time dateTime={datetime_string} className="post-date">{formatted_date}</time></small>
                  </a></li>
                })
              }
            </ul>
          </nav>
        </aside>
        <footer>
          <div className="inner">
            {/* TODO - Format better */}
            <p style={{ gridColumn: 1 }}>
              Olivier Faure's blog<br />
              olivier.cj.faure@gmail.com<br />
              PoignardAzur<br />
              Distributed under CC-BY-4.0<br />
            </p>
            <p style={{ gridColumn: 2 }}>
              Generated using Next.js.<br />
              Theme: TODO<br />
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
