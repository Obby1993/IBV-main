"use client"
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/Footer'

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError('Invalid credentials');
    } else {
      router.push('http://localhost:3000/events');
    }
  };

  return (
    <div>
      <Navbar />
      <div className='m-auto text-center'>
      <h1 className='titre'>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <div className='m-4'>
          <label className='mr-4' htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='m-4'>
          <label className='mr-4' htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='btn btn-outline btn-warning font-emoji mr-6 mb-4' type="submit">Login</button>

        {error && <p>{error}</p>}
      </form>
      </div>
      <Footer />
    </div>
  );
}
