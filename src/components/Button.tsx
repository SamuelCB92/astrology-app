interface ButtonProps {
  children: React.ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return (
    <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-2xl shadow-lg text-lg transition-colors">
      {children}
    </button>
  );
}
