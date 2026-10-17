export function toGcalDate(iso: string): string {
  return new Date(iso)
    .toISOString()
    .replace(/\.\d{3}Z$/, "Z")
    .replace(/[-:]/g, "");
}
