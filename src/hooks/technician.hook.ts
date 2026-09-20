import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { applyAsTechnician, approveTechnician, getAllTechnicians, rejectTechnician } from "@/api";
import { ITechnicianParams } from "@/types/technician.type";

export function useApplyTechnician() {
    return useMutation({
        mutationFn: applyAsTechnician,
    });
}

export function useGetAllTechnicians(params: ITechnicianParams) {
    return useQuery({
        queryKey: ["technicians", params],
        queryFn: () => getAllTechnicians(params),
    });
}

export function useSuspenseGetAllTechnicians(params: ITechnicianParams) {
    return useSuspenseQuery({
        queryKey: ["technicians", params],
        queryFn: () => getAllTechnicians(params),
    });
}

export function useApproveTechnician() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: approveTechnician,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["technicians"] });
        }
    });
}

export function useRejectTechnician() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: rejectTechnician,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["technicians"] });
        }
    });
}