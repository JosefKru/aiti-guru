export function TableCheckbox(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return (
    <input
      type="checkbox"
      className="w-5.5 h-5.5 shrink-0 appearance-none rounded cursor-pointer transition-colors ring-1 ring-muted checked:bg-checkbox checked:ring-muted"
      {...props}
    />
  );
}
