'use client';

import DocumentForm from './components/DocumentForm';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-base-content">
        PDF Generator Test
      </h1>
      <DocumentForm />
    </div>
  );
} 