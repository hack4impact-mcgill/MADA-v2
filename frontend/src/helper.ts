import { Volunteer } from "./Contexts/Volunteer";

export function getCurrentUserId(): string | null | undefined {
  var pattern = /^\/passwordReset/;
  try {
    const user = sessionStorage.getItem("userId");
    if (
      !user &&
      window.location.pathname !== "/" &&
      window.location.pathname !== "/password" &&
      !pattern.test(window.location.pathname)
    ) {
      window.location.href = "/";
      return null;
    }
    return user;
  } catch (error) {
    console.log(error);
    // window.location.href = "/";
  }
}
