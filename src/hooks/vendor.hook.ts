import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllVendors } from "@/api";
import type { IVendorParams } from "@/types";

export function useSuspenseGetAllVendors(params: IVendorParams) {
  return useSuspenseQuery({
    queryKey: ["vendors", params],
    queryFn: () => getAllVendors(params),
  });
}
