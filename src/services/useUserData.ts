import { useMutation, useQuery } from "react-query";
import { UserType } from "../common/types/User";
import { request } from "../lib/axios";

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
    // withCredentials: true,
    data: user,
  });

  return response.data;
};

export const useRegisterUserData = () => {
  return useMutation(registerUser, {
    onSuccess: (data) => {
      return data;
    },
  });
};

export const useFetchUserById = (userId: string) =>
  useQuery(["user"], () => fetchUser(userId));
