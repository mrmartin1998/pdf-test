import './globals.css';

export const metadata = {
  title: 'PDF Generator Test',
  description: 'A simple PDF generator test application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className="bg-base-100 text-base-content">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
} 