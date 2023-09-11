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
        {children}
      </body>
    </html>
  )
}
