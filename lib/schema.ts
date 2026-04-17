import { z } from "zod";

export const leadFormSchema = z.object({
 company: z.string().min(2, { message: "Company must have atleast 2 characters" }).max(50, { message: "Company must have less than 50 characters" }),
 role: z.string().min(2, { message: "Role must have atleast 2 characters" }).max(50, { message: "Role must have less than 50 characters" }),
 contactName: z.string().optional(),
 context: z.string().min(10, { message: "Please provide some context"}).max(500, { message: "Context must have less than 500 characters" }),
 valueProp: z.string().min(10, { message: "Please descript your product or value proposition"}).max(500, { message: "Value proposition must have less than 500 characters" }),
 tone: z.enum(["professional", "friendly", "direct"]), 
})

export type LeadFormValues = z.infer<typeof leadFormSchema>;