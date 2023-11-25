import Head from 'next/head';
import ErrorBoundary from './ErrorBoundary';
import TopSection from '../components/TopSection/TopSection';

type LayoutProps = {
  children?: React.ReactNode;
  title?: string;
};

export default function Layout({ children, title = 'RS School' }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col m-4 cover">
            <ErrorBoundary>
              
              <TopSection />
              <main>{children}</main>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </>
  );
}
