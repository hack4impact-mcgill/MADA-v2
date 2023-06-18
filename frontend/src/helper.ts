import { Volunteer } from "./Contexts/Volunteer";

export function getCurrentUserId(): string | null | undefined {
  try {
    const user = localStorage.getItem("userId");
    if (!user) {
      window.location.href = "/";
      return null;
    }
    return user;
  } catch (error) {
    window.location.href = "/";
  }
}
