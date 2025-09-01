export default function Card({
  title,
  children,
  variant,
  className = "",
  fullWidth = false,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) {
  // Base classes that ALL cards get
  const baseClasses = `flex-col block rounded font-medium transition-colors px-4 py-4 gap-4 ${
    fullWidth ? "w-full" : "max-w-lg"
  }`;
  // Different classes based on variant
  const variantClasses = {
    default: "bg-gray-100 border border-gray-200 shadow-md",
    highlighted: "bg-purple-100 border border-gray-200 shadow-md",
    dark: "bg-gray-900 border border-gray-200 shadow-md text-white",
  };

  return (
    <div
      className={`${baseClasses} ${
        variantClasses[variant as keyof typeof variantClasses]
      } ${className}`}
    >
      <h3 className="text-lg font-bold">{title}</h3>
      {children}
    </div>
  );
}
