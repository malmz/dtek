// @refresh reload
import { Links, Meta, Routes, Scripts } from 'solid-start/root';
import './index.css';

export default function Root() {
  return (
    <html lang='en' data-theme='light'>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />
        <link
          rel='shortcut icon'
          type='image/ico'
          href='/src/assets/favicon.ico'
        />
        <title>Division of Computer Science and Engineering at Chalmers</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div class='flex min-h-screen flex-col justify-between'>
          <Routes />
        </div>
        <Scripts />
      </body>
    </html>
  );
}
