import { useMutation } from "react-query";
import { request } from "../lib/axios";
import { AxiosError } from "axios";

type coverPictureDataType = {
  url: string;
};

type pageSettingsDataType = {
  font: string;
  smallText: boolean;
  fullWidth: boolean;
  lock: boolean;
};

type createPageDataType = {
  title: string;
  icon: string;
  coverPicture: coverPictureDataType;
  content: any;
  favorite: (string | undefined)[];
  pageSettings: pageSettingsDataType;
  path: null | string;
  workspaceId: string;
};

export class usePageData {
  static createPage = async (data: createPageDataType) => {
    const response = await request({
      url: "/pages",
      method: "post",
      data,
    });

    return response.data;
  };

  static useCreatePageData = () => {
    return useMutation(usePageData.createPage, {
      onSuccess: (data) => {
        return data;
      },
      onError: (error: AxiosError) => {},
    });
  };
}
