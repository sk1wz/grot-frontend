import { z } from "zod";

export enum FeedbackStatus {
  NEW = "NEW",
  IN_REVIEW = "IN_REVIEW",
  REJECTED = "REJECTED",
  COMPLETED = "COMPLETED",
  ARCHIVED = "ARCHIVED",
}

export const FeedbackRequestSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  companyName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  message: z.string(),
  status: z.nativeEnum(FeedbackStatus),
  attachmentName: z.string().nullable().optional(),
  attachmentMimeType: z.string().nullable().optional(),
  attachmentSize: z.number().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type FeedbackRequest = z.infer<typeof FeedbackRequestSchema>;
