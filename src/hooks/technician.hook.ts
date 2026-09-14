import { useMutation } from "@tanstack/react-query";
import { applyAsTechnician } from "@/api";

export function useApplyTechnician(){
    return useMutation({
        mutationFn: applyAsTechnician,
    });
}