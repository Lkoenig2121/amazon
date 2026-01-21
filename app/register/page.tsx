'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function RegisterPage() {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/');
        router.refresh();
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amazon-light">
      <div className="max-w-md mx-auto mt-8 mb-16">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300">
          <h1 className="text-3xl font-semibold mb-6">{t('register.title')}</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-1">
                {t('register.name')}
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-amazon-orange"
              />
            </div>

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
                placeholder="At least 6 characters"
              />
              <p className="text-xs text-gray-600 mt-1">
                {t('register.passwordHint')}
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-1">
                {t('register.reenterPassword')}
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-amazon-orange"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amazon-yellow hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded"
            >
              {loading ? t('register.creating') : t('register.createButton')}
            </button>
          </form>

          <div className="mt-4 text-sm">
            <p className="text-gray-600">
              {t('login.agree')}{' '}
              <Link href="/legal/conditions" className="text-blue-600 hover:underline">
                {t('login.conditions')}
              </Link>{' '}
              {t('common.and')}{' '}
              <Link href="/legal/privacy" className="text-blue-600 hover:underline">
                {t('login.privacy')}
              </Link>
              .
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-300">
            <p className="text-sm">
              {t('register.alreadyHave')}{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                {t('common.signIn')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

