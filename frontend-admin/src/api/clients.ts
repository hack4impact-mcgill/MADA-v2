import AxiosInstance from "./axios";

export const getClients = async () => {
  const response = await AxiosInstance({
    method: "get",
    url: "/clients",
  });

  return response;
};

export const getClient = async (id: number) => {
  const response = await AxiosInstance({
    method: "get",
    url: "/clients/" + id.toString(),
  });
  return response;
};

export const editClient = async (props: { id: number; data: any }) => {
  console.log("editing client");
  console.log(props);

  const response = await AxiosInstance({
    method: "put",
    url: "/clients/" + props.id.toString() + "/edit",
    data: props.data,
  });
  return response;
};

export const createClient = async (data: any) => {
  const response = await AxiosInstance({
    method: "post",
    url: "http://localhost:3001/api/clients",
    data: data,
  });
  return response;
};
