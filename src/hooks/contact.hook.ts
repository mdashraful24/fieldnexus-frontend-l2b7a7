import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  createContactMessage,
  getContactMessages,
  updateContactMessageReadStatus,
} from "@/api";
import type { IContactMessageParams } from "@/types";

export function useCreateContactMessage() {
  return useMutation({
    mutationFn: createContactMessage,
  });
}

export function useSuspenseGetContactMessages(params: IContactMessageParams) {
  return useSuspenseQuery({
    queryKey: ["admin", "contact-messages", params],
    queryFn: () => getContactMessages(params),
  });
}

export function useMarkContactMessageRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateContactMessageReadStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "contact-messages"],
      });
    },
  });
}
