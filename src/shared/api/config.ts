const rawOrigin =
  process.env.NEXT_PUBLIC_API_ORIGIN ?? "https://api.ivatracker.ru";

export const apiOrigin = rawOrigin.replace(/\/$/, "");

export const baseURL = `${apiOrigin}/api`;
