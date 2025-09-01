export default function Button({
  variant,
  size,
  children,
  onClick,
  disabled,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) {
  // Base classes that ALL buttons get
  const baseClasses = "rounded font-medium transition-colors";

  // Different classes based on variant
  const variantClasses = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white",
    secondary: "bg-blue-600 hover:bg-blue-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-900",
    outline:
      "bg-transparent hover:bg-gray-100 text-gray-900 border border-gray-900",
  };

  // Different classes based on size
  const sizeClasses = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${
        variantClasses[variant as keyof typeof variantClasses]
      } ${sizeClasses[size as keyof typeof sizeClasses]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
