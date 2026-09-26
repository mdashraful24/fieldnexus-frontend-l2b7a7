import apiClient from "@/lib/apiClient";
import type { ApiResponse, IUpdateUserInfoPayload, IUserProfile } from "@/types";

export function uploadProfilePicture(file: File) {
  const formData = new FormData();

  formData.append("profilePicture", file);

  return apiClient<ApiResponse<IUserProfile>>("/user/upload-profile-picture", {
    method: "PATCH",
    body: formData,
  });
}

export function updateUserInfo(payload: IUpdateUserInfoPayload) {
  return apiClient<ApiResponse<IUserProfile>>("/user/update-user-info", {
    method: "PATCH",
    body: payload,
  });
}
