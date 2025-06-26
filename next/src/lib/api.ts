import { Service, Team, Project, SlotCategory } from "@/types";
import {
  humanServices,
  aiServices,
  mockTeam,
  mockProject,
  alternativeProfiles,
} from "./mock-data";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getAllServices(): Promise<Service[]> {
  await delay(500);
  return [...humanServices, ...aiServices];
}

export async function getServicesByCategory(category: SlotCategory): Promise<Service[]> {
  await delay(300);
  const allServices = [...humanServices, ...aiServices];

  const filtered = allServices.filter((service) => {
    const description = service.description.toLowerCase();
    switch (category) {
      case "frontend":
        return description.includes("react") || description.includes("vue") || description.includes("frontend");
      case "backend":
        return description.includes("laravel") || description.includes("backend") || description.includes("node");
      case "rh":
        return description.includes("rh") || description.includes("recrutement") || description.includes("emploi");
      case "management":
        return description.includes("product") || description.includes("chef") || description.includes("agile");
      case "design":
        return description.includes("design") || description.includes("ux") || description.includes("ui");
      default:
        return true;
    }
  });

  if (alternativeProfiles[category]) {
    filtered.push(...alternativeProfiles[category]);
  }

  return filtered;
}

export async function getServiceById(id: string): Promise<Service | null> {
  await delay(200);
  const allServices = [...humanServices, ...aiServices];
  return allServices.find(service => service.id === id) || null;
}

export async function searchServices(query: string): Promise<Service[]> {
  await delay(400);
  const allServices = [...humanServices, ...aiServices];

  const searchTerm = query.toLowerCase();
  return allServices.filter(service =>
    service.name.toLowerCase().includes(searchTerm)
    || service.description.toLowerCase().includes(searchTerm)
    || service.contractor.name.toLowerCase().includes(searchTerm),
  );
}

export async function getTeamById(id: string): Promise<Team | null> {
  await delay(300);
  return id === mockTeam.id ? mockTeam : null;
}

export async function updateTeam(team: Team): Promise<Team> {
  await delay(500);
  return {
    ...team,
    updatedAt: new Date(),
  };
}

export async function assignServiceToSlot(
  slotId: string,
  serviceId: string,
): Promise<Team> {
  await delay(400);

  const service = await getServiceById(serviceId);
  if (!service) {
    throw new Error("Service not found");
  }

  const updatedTeam = {
    ...mockTeam,
    slots: mockTeam.slots.map((slot) => {
      if (slot.id === slotId) {
        return {
          ...slot,
          isAssigned: true,
          assignedService: service,
        };
      }
      return slot;
    }),
    updatedAt: new Date(),
  };

  return updatedTeam;
}

export async function getProjectById(id: string): Promise<Project | null> {
  await delay(300);
  return id === mockProject.id ? mockProject : null;
}

export async function createProject(projectData: Partial<Project>): Promise<Project> {
  await delay(600);

  const newProject: Project = {
    id: crypto.randomUUID(),
    title: projectData.title || "Nouveau projet",
    description: projectData.description || "",
    requirements: projectData.requirements || {
      description: "",
      technologies: [],
      priority: "medium",
    },
    ownerId: "mock-owner",
    status: "draft",
    createdAt: new Date(),
    updatedAt: new Date(),
    ...projectData,
  };

  return newProject;
}

export function calculateTeamCosts(team: Team): { monthly: number; daily: number } {
  let monthly = 0;
  let daily = 0;

  team.slots.forEach((slot) => {
    if (slot.isAssigned && slot.assignedService) {
      const service = slot.assignedService;
      if (service.type === "ai") {
        monthly += service.price;
        daily += service.price / 30;
      }
      else {
        const monthlyEstimate = service.pricePerDays * 20;
        monthly += monthlyEstimate;
        daily += service.pricePerDays;
      }
    }
  });

  return {
    monthly: Math.round(monthly),
    daily: Math.round(daily),
  };
}

export function getMatchingScore(service: Service, slot: Team["slots"][0]): number {
  let score = 0.5;
  if (slot.category === "rh" && service.type === "ai") {
    score += 0.2;
  }
  if (slot.category !== "rh" && service.type === "human") {
    score += 0.2;
  }

  if (slot.requirements) {
    const description = service.description.toLowerCase();
    const matchingReqs = slot.requirements.filter(req =>
      description.includes(req.toLowerCase()),
    );
    score += (matchingReqs.length / slot.requirements.length) * 0.3;
  }

  return Math.min(score, 1);
}
