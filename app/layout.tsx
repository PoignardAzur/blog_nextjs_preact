export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
        <aside><h1>Sidebar</h1></aside>
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
