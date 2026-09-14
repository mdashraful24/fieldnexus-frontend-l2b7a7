import apiClient from "@/lib/apiClient";
import { ITechnicianApplicationPayload } from "@/types";

export function applyAsTechnician(payload: ITechnicianApplicationPayload) {
    const formData = new FormData();

    formData.append("name", payload.data.name);
    formData.append("email", payload.data.email);

    if (payload.data.contactNumber) {
        formData.append("contactNumber", payload.data.contactNumber);
    }

    if (payload.data.address) {
        formData.append("address", payload.data.address);
    }

    formData.append("qualifications", payload.data.qualifications);
    formData.append("experienceYears", String(payload.data.experienceYears));

    if (payload.data.skills?.length) {
        for (const skill of payload.data.skills) {
            formData.append("skills", skill);
        }
    }

    if (payload.data.bio) {
        formData.append("bio", payload.data.bio);
    }

    formData.append("resume", payload.resume);

    for (const document of payload.additionalDocuments) {
        formData.append("additionalDocuments", document);
    }

    return apiClient("/technician-applications/apply", {
        method: "POST",
        body: formData,
    });
};