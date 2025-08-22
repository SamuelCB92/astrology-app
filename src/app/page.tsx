import AuthButton from "@components/AuthButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-800 via-indigo-900 to-black text-white px-4">
      <h1 className="text-5xl font-bold mb-6 text-center">
        ✨ Tarot & Astrology ✨
      </h1>
      <p className="text-lg max-w-xl text-center mb-8">
        Personalized guidance through Tarot and Vedic Astrology. Sign up to
        access your private space and exclusive readings.
      </p>
      <AuthButton />
    </main>
  );
}
