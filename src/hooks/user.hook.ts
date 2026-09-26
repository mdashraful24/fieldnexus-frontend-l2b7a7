import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserInfo, uploadProfilePicture } from "@/api";
import type { IUpdateUserInfoPayload } from "@/types";

export function useUploadProfilePicture() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadProfilePicture(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["USER"] });
    },
  });
}

export function useUpdateUserInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IUpdateUserInfoPayload) => updateUserInfo(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["USER"] });
    },
  });
}
