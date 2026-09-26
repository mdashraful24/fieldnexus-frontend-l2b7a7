import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { applyAsTechnician, approveTechnician, getAllTechnicians, getTechnicianApplicationById, getTechnicianApplicationStatus, rejectTechnician } from "@/api";
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

export function useGetTechnicianApplicationStatus(email: string) {
    return useQuery({
        queryKey: ["technician-application-status", email],
        queryFn: () => getTechnicianApplicationStatus(email),
        enabled: !!email,
        retry: false,
    });
}

export function useGetTechnicianApplicationById(applicationId: string) {
    return useQuery({
        queryKey: ["technicians", "application", applicationId],
        queryFn: () => getTechnicianApplicationById(applicationId),
        enabled: !!applicationId,
        retry: false,
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