import { useMutation, useQuery } from "react-query";
import { request } from "../lib/axios";
import { AxiosError } from "axios";
import { WorkspaceType } from "../common/types/User";

type updateWorkspaceNameType = {
  name: string;
  workspaceId: string;
};

type updateWorkspaceIconType = {
  icon: string;
  workspaceId: string;
};

type deleteWorkspaceDataType = {
  workspaceId: string;
};

type FetchWorkspaceById = (workspaceId: string) => Promise<WorkspaceType>;

type FetchChildPagesDataType = {
  workspaceId: string;
  pageReference: string;
};

export class useWorkspaceData {
  static updateWorkspaceName = async (data: updateWorkspaceNameType) => {
    const response = await request({
      url: `/workspaces/${data.workspaceId}`,
      method: "patch",
      data,
    });

    return response.data;
  };

  static updateWorkspaceIcon = async (data: updateWorkspaceIconType) => {
    const response = await request({
      url: `/workspaces/${data.workspaceId}`,
      method: "patch",
      data,
    });

    return response.data;
  };

  static deleteWorkspace = async (data: deleteWorkspaceDataType) => {
    const response = await request({
      url: `/workspaces/${data.workspaceId}`,
      method: "delete",
      data,
    });

    return response.data;
  };

  static fetchWorkspace: FetchWorkspaceById = async (workspaceId: string) => {
    const response = await request({
      url: `/workspaces/${workspaceId}`,
      method: "get",
    });

    return response.data;
  };

  static fetchChildPages = async (data: FetchChildPagesDataType) => {
    const response = await request({
      url: `/workspaces/${data.workspaceId}/pages/${data.pageReference}/childrens`,
      method: "get",
    });

    return response.data;
  };

  static useUpdateWorkspaceNameData = () => {
    return useMutation(useWorkspaceData.updateWorkspaceName, {
      onSuccess: (data) => {
        return data;
      },
      onError: (error: AxiosError) => {},
    });
  };

  static useUpdateWorkspaceIconData = () => {
    return useMutation(useWorkspaceData.updateWorkspaceIcon, {
      onSuccess: (data) => {
        return data;
      },
      onError: (error: AxiosError) => {},
    });
  };

  static useDeleteWorkspaceData = () => {
    return useMutation(useWorkspaceData.deleteWorkspace, {
      onSuccess: (data) => {
        return data;
      },
      onError: (error: AxiosError) => {},
    });
  };

  static useFetchWorkspaceById = (workspaceId: string) =>
    useQuery(["workspace", workspaceId], () =>
      useWorkspaceData.fetchWorkspace(workspaceId)
    );

  static useFetchChildPagesByworkspaceIdAndPageReference = (
    workspaceId: string,
    pageReference: string
  ) =>
    useQuery(["child-pages", pageReference], () =>
      useWorkspaceData.fetchChildPages({ workspaceId, pageReference })
    );
}
