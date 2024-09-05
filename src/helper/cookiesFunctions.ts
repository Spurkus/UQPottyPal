"use server";
import { cookies } from "next/headers";

const DEFAULT_THEME = "dark";

export const saveThemeToCookie = async (theme: string) => {
  const cookieStore = cookies();
  cookieStore.set("theme", theme);
};

export const getThemeFromCookie = async () => {
  const cookieStore = cookies();
  return cookieStore.get("theme")?.value || DEFAULT_THEME;
};
