import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <>
      <Html>
        <Head></Head>
        <body className="min-h-screen min-w-screen flex flex-col">
          <div className="flex-grow">
            <Main />
            <NextScript />
          </div>
        </body>
      </Html>
    </>
  );
};

export default Document;
