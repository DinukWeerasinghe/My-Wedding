export function cleanGuestName(value) {
  if (typeof value !== "string") return "";

  const rawValue = value.trim();
  if (!rawValue) return "";

  let decodedValue = rawValue;
  try {
    decodedValue = decodeURIComponent(rawValue);
  } catch {
    decodedValue = rawValue;
  }

  return decodedValue
    .replace(/_/g, " ")
    .replace(/\s+/gu, " ")
    .trim();
}

export function getGuestNameFromSearch(search = "") {
  const sourceSearch =
    search || (typeof window !== "undefined" ? window.location.search : "");
  const params = new URLSearchParams(sourceSearch);
  return cleanGuestName(params.get("name"));
}

export function buildInvitationPathForGuest(name) {
  const cleanName = cleanGuestName(name);
  if (!cleanName) return "/";

  const params = new URLSearchParams();
  params.set("name", cleanName.replace(/\s+/gu, "_"));
  return `/?${params.toString()}`;
}
