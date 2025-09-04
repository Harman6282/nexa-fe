export function formatDate(dateInput: string | Date): string {
  if (dateInput === null) return "N/A";
  const date = new Date(dateInput);

  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);

  return `${dd}/${mm}/${yy}`;
}
