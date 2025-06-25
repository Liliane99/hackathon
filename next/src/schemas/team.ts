import { z } from "zod";
import { serviceSchema } from "./service";

export const teamSlotSchema = z.object({
  id: z.string().uuid(),
  role: z.string(),
  category: z.enum([
    "frontend", 
    "backend", 
    "fullstack", 
    "devops", 
    "rh", 
    "management", 
    "design", 
    "qa",
    "marketing",
    "data"
  ]),
  isRequired: z.boolean(),
  isAssigned: z.boolean().default(false),
  assignedService: serviceSchema.optional(),
  requirements: z.array(z.string()).optional(),
  seniority: z.enum(["junior", "mid", "senior", "lead"]).optional(),
  description: z.string().optional(),
  estimatedWorkload: z.string().optional(), 
});

export const teamSchema = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  slots: z.array(teamSlotSchema),
  status: z.enum(["building", "complete", "active", "archived"]).default("building"),
  createdAt: z.date(),
  updatedAt: z.date(),
  estimatedMonthlyCost: z.number().optional(),
  estimatedDailyCost: z.number().optional(),
});

export type TeamSlot = z.infer<typeof teamSlotSchema>;
export type Team = z.infer<typeof teamSchema>;

export type SlotCategory = TeamSlot["category"];
export type TeamStatus = Team["status"];
export type SeniorityLevel = NonNullable<TeamSlot["seniority"]>;