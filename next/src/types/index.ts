export type { Service } from "@/schemas/service";
export type { 
  Team, 
  TeamSlot, 
  SlotCategory, 
  TeamStatus, 
  SeniorityLevel 
} from "@/schemas/team";
export type { 
  Project, 
  ProjectRequirement, 
  ProjectStatus, 
  ProjectPriority, 
  CompanySize 
} from "@/schemas/project";

export interface TeamMember {
  slotId: string;
  service: Service;
  assignedAt: Date;
  status: "active" | "pending" | "inactive";
}

export interface TeamStats {
  totalMembers: number;
  humanMembers: number;
  aiMembers: number;
  estimatedMonthlyCost: number;
  estimatedDailyCost: number;
  assignedSlots: number;
  pendingSlots: number;
}

export interface ProjectOverview {
  project: Project;
  team?: Team;
  stats?: TeamStats;
  progress: {
    teamBuildingProgress: number; 
    overallProgress: number;
  };
}

export interface ServiceFilters {
  category?: SlotCategory;
  type?: "human" | "ai";
  seniority?: SeniorityLevel;
  minPrice?: number;
  maxPrice?: number;
  technologies?: string[];
  available?: boolean;
}

export interface ProjectFilters {
  status?: ProjectStatus[];
  priority?: ProjectPriority[];
  industry?: string[];
  companySize?: CompanySize[];
  technologies?: string[];
  budget?: {
    min?: number;
    max?: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  success: boolean;
}

export interface CreateProjectForm {
  title: string;
  description: string;
  requirements: {
    description: string;
    technologies: string[];
    timeline?: string;
    budget?: number;
    priority: ProjectPriority;
  };
  ownerName?: string;
  ownerEmail?: string;
}

export interface TeamSlotForm {
  role: string;
  category: SlotCategory;
  isRequired: boolean;
  requirements?: string[];
  seniority?: SeniorityLevel;
  description?: string;
  estimatedWorkload?: string;
}

export interface ServiceCardProps {
  service: Service;
  onSelect?: (service: Service) => void;
  onAccept?: (service: Service) => void;
  showPrice?: boolean;
  size?: "sm" | "md" | "lg";
}

export interface TeamSlotCardProps {
  slot: TeamSlot;
  onServiceClick?: (service: Service) => void;
  onAssignService?: (slotId: string, service: Service) => void;
  onRemoveService?: (slotId: string) => void;
  editable?: boolean;
}

export interface TeamBuilderState {
  currentTeam?: Team;
  availableServices: Service[];
  selectedSlot?: TeamSlot;
  isLoading: boolean;
  error?: string;
}

export interface ProfilesState {
  profiles: Service[];
  filteredProfiles: Service[];
  filters: ServiceFilters;
  isLoading: boolean;
  error?: string;
}

export interface ServiceSelectedEvent {
  service: Service;
  slot?: TeamSlot;
  action: "view" | "assign" | "replace";
}

export interface TeamUpdateEvent {
  team: Team;
  changes: {
    type: "slot_assigned" | "slot_removed" | "slot_updated" | "team_completed";
    slotId?: string;
    serviceId?: string;
    previousState?: any;
  };
}

export const SLOT_CATEGORIES = [
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
] as const;

export const SENIORITY_LEVELS = [
  "junior",
  "mid", 
  "senior",
  "lead"
] as const;

export const PROJECT_STATUSES = [
  "draft",
  "requirements_analysis",
  "team_building", 
  "team_ready",
  "in_progress",
  "on_hold",
  "completed",
  "cancelled"
] as const;

export const SERVICE_TYPES = ["human", "ai"] as const;
export function isValidSlotCategory(category: string): category is SlotCategory {
  return SLOT_CATEGORIES.includes(category as SlotCategory);
}

export function isValidSeniority(seniority: string): seniority is SeniorityLevel {
  return SENIORITY_LEVELS.includes(seniority as SeniorityLevel);
}

export function isValidProjectStatus(status: string): status is ProjectStatus {
  return PROJECT_STATUSES.includes(status as ProjectStatus);
}

export type ServiceMatcher = (service: Service, slot: TeamSlot) => number;
export type CostCalculator = (team: Team) => { monthly: number; daily: number };
export type TeamValidator = (team: Team) => { isValid: boolean; errors: string[] };

export interface MockDataset {
  services: Service[];
  teams: Team[];
  projects: Project[];
  alternativeProfiles: Record<SlotCategory, Service[]>;
}

export class TeamBuilderError extends Error {
  constructor(
    message: string,
    public code: string,
    public context?: any
  ) {
    super(message);
    this.name = "TeamBuilderError";
  }
}

export class ServiceNotFoundError extends TeamBuilderError {
  constructor(serviceId: string) {
    super(`Service with id ${serviceId} not found`, "SERVICE_NOT_FOUND", { serviceId });
  }
}

export class SlotAssignmentError extends TeamBuilderError {
  constructor(slotId: string, reason: string) {
    super(`Cannot assign service to slot ${slotId}: ${reason}`, "SLOT_ASSIGNMENT_ERROR", { slotId, reason });
  }
}