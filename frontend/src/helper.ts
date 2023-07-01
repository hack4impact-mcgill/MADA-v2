import { Volunteer } from "./Contexts/Volunteer";

export function getCurrentUserId(): string | null | undefined {
  try {
    const user = sessionStorage.getItem("userId");
    console.log(user)
    if (!user && window.location.pathname !== "/") {
      window.location.href = "/";
      return null;
    }
    return user;
  } catch (error) {
    console.log(error);
    // window.location.href = "/";
  }
}
