import { useMutation, useQuery } from "react-query";
import { UserType } from "../common/types/User";
import { request } from "../lib/axios/index";
import { AxiosError } from "axios";

type userDataType = Omit<
  UserType,
  "id" | "workspaces" | "createdAt" | "updatedAt"
>;

type FetchUserById = (userId: string) => Promise<UserType>;

const fetchUser: FetchUserById = async (userId: string) => {
  const response = await request({
    url: `/users/${userId}`,
  });

  return response.data;
};

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

export const useFetchUserById = (userId: string) =>
  useQuery(["user"], () => fetchUser(userId));
