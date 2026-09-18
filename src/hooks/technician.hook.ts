import { useMutation, useQuery } from "@tanstack/react-query";
import { applyAsTechnician, approveTechnician, getAllTechnicians, rejectTechnician } from "@/api";
import { ITechnicianParams } from "@/types/technician.type";

export function useApplyTechnician(){
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

export function useApproveTechnician() {
    return useMutation({
        mutationFn: approveTechnician,
    });
}

export function useRejectTechnician() {
    return useMutation({
        mutationFn: rejectTechnician,
    });
}