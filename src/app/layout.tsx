import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr">
      <head>
        <title>BombYangGang</title>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
