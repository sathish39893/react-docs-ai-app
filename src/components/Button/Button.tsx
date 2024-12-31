export const Button = ({
  label,
  onClick,
  type = 'button',
}: {
  label: string;
  type: 'button' | 'submit' | 'reset';
  onClick: () => void;
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
    >
      {label}
    </button>
  );
};
