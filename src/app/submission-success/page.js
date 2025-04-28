'use client';

import Link from 'next/link';

export default function SubmissionSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold mb-4">Application Submitted Successfully!</h1>
        <p className="mb-6">Thank you for your submission. Our team will review your application.</p>
        <Link href="/" className="btn btn-primary mr-4">
          Return to Home
        </Link>
        <Link href="/admin" className="btn btn-secondary">
          Go to Admin Page
        </Link>
      </div>
    </div>
  );
} 