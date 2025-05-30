export function formatTitle(title: string): string {
  const words = title.trim().toLowerCase().split(" ");
  if (words.length === 0) return "";
  return (
    words[0].charAt(0).toUpperCase() +
    words[0].slice(1) +
    (words.length > 1 ? " " + words.slice(1).join(" ") : "")
  );
}
