export default function NumberInput({ type }) {
  const SCALE = "칸";

  return (
    <span className="p-1">
      {type}
      <input min="9" max="30" defaultValue="9" type="number" className="text-center w-9 h-6 py-4" required />
      {SCALE}
    </span>
  );
}
