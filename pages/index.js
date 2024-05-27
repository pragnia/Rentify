import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const goToProperties = () => {
    router.push('/properties');
  };

  return (
    <div>
      <h1>Welcome to Real Estate App</h1>
      <button onClick={goToProperties}>View Properties</button>
    </div>
  );
}
