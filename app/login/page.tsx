'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LoginPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/');
        router.refresh();
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillDummyCredentials = () => {
    setEmail('demo@amazon.com');
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-amazon-light">
      <div className="max-w-md mx-auto mt-8 mb-16">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300">
          <h1 className="text-3xl font-semibold mb-6">{t('login.title')}</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-1">
                {t('login.email')}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-amazon-orange"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-1">
                {t('login.password')}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-amazon-orange"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amazon-yellow hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded"
            >
              {loading ? t('login.signingIn') : t('login.title')}
            </button>
          </form>

          <div className="mt-4 text-sm">
            <p className="text-gray-600">
              By continuing, you agree to Amazon's{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Conditions of Use
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Notice
              </a>
              .
            </p>
          </div>

          {/* Dummy Account Information */}
          <div className="mt-6 pt-6 border-t border-gray-300">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">{t('login.testAccount')}</h3>
              <div className="text-xs text-blue-800 space-y-1 mb-3">
                <div>
                  <span className="font-semibold">Email:</span> demo@amazon.com
                </div>
                <div>
                  <span className="font-semibold">Password:</span> demo123
                </div>
              </div>
              <button
                type="button"
                onClick={fillDummyCredentials}
                className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded font-semibold"
              >
                {t('login.fillCredentials')}
              </button>
              <p className="text-xs text-blue-700 mt-2 italic">
                {t('login.note')}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-300">
            <p className="text-sm">
              New to Amazon?{' '}
              <Link href="/register" className="text-blue-600 hover:underline">
                Create your Amazon account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

