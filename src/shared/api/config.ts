const rawOrigin =
  process.env.NEXT_PUBLIC_API_ORIGIN ?? "https://api.ivatracker.ru";

export const apiOrigin = rawOrigin
  .replace(/\/$/, "")
  .replace(/^http:\/\/(api\.ivatracker\.ru(?::\d+)?)/, "https://$1");

export const baseURL = `${apiOrigin}/api`;
