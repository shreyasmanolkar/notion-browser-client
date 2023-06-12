import { useMutation } from "react-query";
import { UserType } from "../common/types/User";
import { request } from "../lib/axios/index";
import { AxiosError } from "axios";

type userDataType = Omit<
  UserType,
  "id" | "workspaces" | "createdAt" | "updatedAt"
>;

const registerUser = async (user: userDataType) => {
  const response = await request({
    url: "/register",
    method: "post",
    data: user,
  });

  return response.data;
};

export const useRegisterUserData = () => {
  return useMutation(registerUser, {
    onSuccess: (data) => {
      return data;
    },
    onError: (error: AxiosError) => {},
  });
};
