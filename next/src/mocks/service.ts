/* eslint-disable no-undef */
// utils/service-repository.ts
import { Service } from "../schemas/service";
import { uuidv7 } from "uuidv7";

type GoodOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;

const STORAGE_KEY = "mock_services";

export class ServiceRepository {
  private static getServices(): Service[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    }
    catch (e) {
      console.error("Failed to read services from localStorage", e);
      return [];
    }
  }

  private static saveServices(services: Service[]) {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    }
  }

  public static create(params: GoodOmit<Service, "id">): Service {
    const service: Service = {
      id: uuidv7(),
      ...params,
    };

    const current = this.getServices();
    const updated = [...current, service];
    this.saveServices(updated);

    return service;
  }

  public static findById(id: string): Service | null {
    return this.getServices().find(s => s.id === id) ?? null;
  }

  public static findAll(): Service[] {
    return this.getServices();
  }

  public static clear() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}
