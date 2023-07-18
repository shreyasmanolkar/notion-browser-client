import { useMutation } from "react-query";
import { UserType, WorkspaceType } from "../common/types/User";
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

type createWorkspaceDataType = {
  name: string;
  icon: string;
};

type updateUserNameDataType = {
  name: string;
  userId: string;
};

type updateUserWorkspaceListDataType = {
  userId: string;
  workspaces: WorkspaceType[];
};

type updateIsDarkModeDataType = {
  isDarkMode: boolean;
  userId: string;
};

type deleteUserDataType = {
  userId: string;
};

type uploadUserProgilePictureDataType = {
  userId: string;
  url: string;
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

  static createWorkspace = async (data: createWorkspaceDataType) => {
    const response = await request({
      url: "/workspaces",
      method: "post",
      data,
    });

    return response.data;
  };

  static updateUserName = async (data: updateUserNameDataType) => {
    const response = await request({
      url: `/users/${data.userId}`,
      method: "patch",
      data,
    });

    return response.data;
  };

  static updateUserWorkspaceList = async (
    data: updateUserWorkspaceListDataType
  ) => {
    const response = await request({
      url: `/users/${data.userId}`,
      method: "patch",
      data,
    });

    return response.data;
  };

  static updateIsDarkMode = async (data: updateIsDarkModeDataType) => {
    const response = await request({
      url: `/users/${data.userId}`,
      method: "patch",
      data,
    });

    return response.data;
  };

  static deleteUser = async (data: deleteUserDataType) => {
    const response = await request({
      url: `/users/${data.userId}`,
      method: "delete",
      data,
    });

    return response.data;
  };

  static uploadUserProfilePicture = async (
    data: uploadUserProgilePictureDataType
  ) => {
    const response = await request({
      url: `/users/${data.userId}/profile-picture`,
      method: "patch",
      data,
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

  static useCreateWorkspaceData = () => {
    return useMutation(useUserData.createWorkspace, {
      onSuccess: (data) => {
        return data;
      },
      onError: (error: AxiosError) => {},
    });
  };

  static useUpdateUserNameData = () => {
    return useMutation(useUserData.updateUserName, {
      onSuccess: (data) => {
        return data;
      },
      onError: (error: AxiosError) => {},
    });
  };

  static useUpdateUserWorkspaceListData = () => {
    return useMutation(useUserData.updateUserWorkspaceList, {
      onSuccess: (data) => {
        return data;
      },
      onError: (error: AxiosError) => {},
    });
  };

  static useUpdateIsDarkModeData = () => {
    return useMutation(useUserData.updateIsDarkMode, {
      onSuccess: (data) => {
        return data;
      },
      onError: (error: AxiosError) => {},
    });
  };

  static useDeleteUserData = () => {
    return useMutation(useUserData.deleteUser, {
      onSuccess: (data) => {
        return data;
      },
      onError: (error: AxiosError) => {},
    });
  };

  static useUploadUserProfilePictureData = () => {
    return useMutation(useUserData.uploadUserProfilePicture, {
      onSuccess: (data) => {
        return data;
      },
      onError: (error: AxiosError) => {},
    });
  };
}
