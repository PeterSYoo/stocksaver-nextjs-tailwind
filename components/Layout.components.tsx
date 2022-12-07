import { Footer } from './Footer.components';
import { Header } from './Header.components';

export const Layout = ({ children }: any) => {
  return (
    <>
      <div className="min-h-screen min-w-screen flex flex-col">
        <Header />
        <main className="flex-grow z-0">{children}</main>
        <div className="flex items-end">
          <Footer />
        </div>
      </div>
    </>
  );
};
