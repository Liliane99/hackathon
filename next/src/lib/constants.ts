export const CATEGORIES = {
    frontend: "Frontend",
    backend: "Backend", 
    fullstack: "Fullstack",
    devops: "DevOps",
    rh: "Ressources Humaines",
    management: "Management",
    design: "Design",
    qa: "Quality Assurance",
    marketing: "Marketing",
    data: "Data Science"
  } as const;
  
  export const SENIORITY_LEVELS = {
    junior: "Junior (0-2 ans)",
    mid: "Confirmé (2-5 ans)", 
    senior: "Senior (5+ ans)",
    lead: "Lead/Expert (8+ ans)"
  } as const;
  
  export const SERVICE_TYPES = {
    human: "Humain",
    ai: "Agent IA"
  } as const;
  
  export const PROJECT_PRIORITIES = {
    low: "Faible",
    medium: "Moyenne",
    high: "Haute",
    urgent: "Urgente"
  } as const;
  
  export const PROJECT_STATUSES = {
    draft: "Brouillon",
    requirements_analysis: "Analyse des besoins",
    team_building: "Constitution d'équipe",
    team_ready: "Équipe prête",
    in_progress: "En cours",
    on_hold: "En pause",
    completed: "Terminé",
    cancelled: "Annulé"
  } as const;
  
  export const TEAM_STATUSES = {
    building: "En construction",
    complete: "Complète",
    active: "Active",
    archived: "Archivée"
  } as const;
  
  export const COMPANY_SIZES = {
    startup: "Startup (1-10)",
    small: "Petite (11-50)",
    medium: "Moyenne (51-200)",
    large: "Grande (201-1000)",
    enterprise: "Entreprise (1000+)"
  } as const;
  
  export const CATEGORY_COLORS = {
    frontend: "bg-blue-100 text-blue-800 border-blue-200",
    backend: "bg-green-100 text-green-800 border-green-200",
    fullstack: "bg-purple-100 text-purple-800 border-purple-200",
    devops: "bg-orange-100 text-orange-800 border-orange-200",
    rh: "bg-pink-100 text-pink-800 border-pink-200",
    management: "bg-indigo-100 text-indigo-800 border-indigo-200",
    design: "bg-teal-100 text-teal-800 border-teal-200",
    qa: "bg-yellow-100 text-yellow-800 border-yellow-200",
    marketing: "bg-red-100 text-red-800 border-red-200",
    data: "bg-cyan-100 text-cyan-800 border-cyan-200"
  } as const;
  
  export const SENIORITY_COLORS = {
    junior: "bg-gray-100 text-gray-700 border-gray-200",
    mid: "bg-blue-100 text-blue-700 border-blue-200",
    senior: "bg-green-100 text-green-700 border-green-200",
    lead: "bg-purple-100 text-purple-700 border-purple-200"
  } as const;
  
  export const PRIORITY_COLORS = {
    low: "bg-gray-100 text-gray-700 border-gray-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    high: "bg-orange-100 text-orange-700 border-orange-200",
    urgent: "bg-red-100 text-red-700 border-red-200"
  } as const;
  
  export const DEFAULT_FILTERS = {
    category: undefined,
    type: undefined,
    seniority: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    technologies: [],
    available: true
  };
  
  export const DEFAULT_PAGINATION = {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  };
  
  export const VALIDATION_RULES = {
    project: {
      titleMinLength: 3,
      titleMaxLength: 100,
      descriptionMinLength: 10,
      descriptionMaxLength: 1000,
      budgetMin: 1000,
      budgetMax: 10000000,
      teamSizeMin: 1,
      teamSizeMax: 50
    },
    service: {
      nameMinLength: 2,
      nameMaxLength: 100,
      descriptionMinLength: 10,
      descriptionMaxLength: 500,
      priceMin: 1,
      priceMax: 2000
    }
  };

  export const API_ENDPOINTS = {
    services: "/api/services",
    teams: "/api/teams",
    projects: "/api/projects",
    profiles: "/api/profiles"
  } as const;

  export const TOAST_MESSAGES = {
    serviceAssigned: (name: string) => ({
      title: "Service assigné !",
      description: `${name} a été ajouté à votre équipe 🎉`
    }),
    serviceRemoved: (name: string) => ({
      title: "Service retiré",
      description: `${name} a été retiré de votre équipe`
    }),
    teamCompleted: {
      title: "Équipe complétée !",
      description: "Votre équipe est maintenant prête à démarrer le projet 🚀"
    },
    teamValidationError: (errors: string[]) => ({
      title: "Équipe incomplète",
      description: errors.join(", ")
    }),
    loadingError: {
      title: "Erreur de chargement",
      description: "Impossible de charger les données. Veuillez réessayer."
    },
    saveSuccess: {
      title: "Sauvegarde réussie",
      description: "Vos modifications ont été enregistrées"
    }
  } as const;