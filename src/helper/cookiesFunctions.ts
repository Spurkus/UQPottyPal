"use server";
import { cookies } from "next/headers";

const DEFAULT_THEME = "dark";

/**
 * Saves the selected theme to a cookie.
 * @param theme - The theme string to be saved in the cookie.
 */
export const saveThemeToCookie = async (theme: string) => {
  const cookieStore = cookies();
  cookieStore.set("theme", theme);
};

/**
 * Retrieves the saved theme from the cookie.
 * @returns The theme stored in the cookie, or the default theme if none is found.
 */
export const getThemeFromCookie = async () => {
  const cookieStore = cookies();
  return cookieStore.get("theme")?.value || DEFAULT_THEME;
};
