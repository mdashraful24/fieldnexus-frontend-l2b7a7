import { useQuery } from "@tanstack/react-query";
import { getAllServiceCategories } from "@/api";

export function useGetAllServiceCategories() {
  return useQuery({
    queryKey: ["service-categories"],
    queryFn: getAllServiceCategories,
    retry: false,
  });
}
