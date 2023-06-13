import { useMutation } from "react-query";
import { UserType } from "../common/types/User";
import { request } from "../lib/axios/index";
import { AxiosError } from "axios";

type userDataType = Omit<
  UserType,
  "id" | "workspaces" | "createdAt" | "updatedAt"
>;

type credientialsType = {
  email: string;
  password: string;
};

export class useUserData {
  static registerUser = async (user: userDataType) => {
    const response = await request({
      url: "/register",
      method: "post",
      data: user,
    });

    return response.data;
  };

  static loginUser = async (credentials: credientialsType) => {
    const response = await request({
      url: "/login",
      method: "post",
      data: credentials,
    });

    return response.data;
  };

  static useRegisterUserData = () => {
    return useMutation(useUserData.registerUser, {
      onSuccess: (data) => {
        return data;
      },
      onError: (error: AxiosError) => {},
    });
  };

  static useLoginUserData = () => {
    return useMutation(useUserData.loginUser, {
      onSuccess: (data) => {
        return data;
      },
      onError: (error: AxiosError) => {},
    });
  };
}
