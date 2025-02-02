import { z } from "zod";

const ApplicationCardDescription = z.object({
    step_id: z.number().min(1),
    short_desc: z.string().nullable(),
    company_size: z.string().nullable(),
    hybrid: z.string().nullable(),
    location: z.object({lat: z.string().nullable(), lng: z.string().nullable()}).nullable(),
    activity: z.array(z.number().nullable()).nullable(),
    reminder: z.string().nullable(),
    job_description: z.string().nullable(),
    stack_tags: z.array(z.number().nullable()).nullable(),
});

type ApplicationCardDescriptionRequest = z.infer<typeof ApplicationCardDescription>;

export {
    ApplicationCardDescription,
    ApplicationCardDescriptionRequest,
};