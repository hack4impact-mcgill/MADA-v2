import AxiosInstance from "./axios";

export const login = async (data: any) => {
  console.log("hello");
  console.log(data);
  const response = await AxiosInstance.post("/admin-login", data);
  console.log(response);
  return response;
};
