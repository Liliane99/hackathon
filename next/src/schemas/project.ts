import { z } from "zod";

export const projectRequirementSchema = z.object({
  description: z.string(),
  technologies: z.array(z.string()),
  timeline: z.string().optional(),
  budget: z.number().optional(),
  teamSize: z.number().optional(),
  priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
  deliverables: z.array(z.string()).optional(),
  constraints: z.array(z.string()).optional(),
});

export const projectSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  requirements: projectRequirementSchema,
  ownerId: z.string(),
  ownerName: z.string().optional(),
  ownerEmail: z.string().email().optional(),
  status: z.enum([
    "draft",
    "requirements_analysis",
    "team_building",
    "team_ready",
    "in_progress",
    "on_hold",
    "completed",
    "cancelled",
  ]).default("draft"),
  createdAt: z.date(),
  updatedAt: z.date(),
  estimatedDuration: z.string().optional(),
  actualStartDate: z.date().optional(),
  expectedEndDate: z.date().optional(),
  actualEndDate: z.date().optional(),
  tags: z.array(z.string()).optional(),
  industry: z.string().optional(),
  companySize: z.enum(["startup", "small", "medium", "large", "enterprise"]).optional(),
});

export type ProjectRequirement = z.infer<typeof projectRequirementSchema>;
export type Project = z.infer<typeof projectSchema>;

export type ProjectStatus = Project["status"];
export type ProjectPriority = ProjectRequirement["priority"];
export type CompanySize = NonNullable<Project["companySize"]>;
