export function Button({ onClick, children }) {
  return (
    <button
      className="bg-indigo-500 px-7 py-2 rounded-md my-2 disabled:bg-indigo-300"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
