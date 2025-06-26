import { Service } from "../schemas/service";
import { uuidv7 } from "uuidv7";

type GoodOmit<T, K extends keyof T> = T extends unknown
  ? Omit<T, K>
  : never;

export class ServiceRepository {
  private static services: Service[] = [];

  public static create(params: GoodOmit<Service, "id">) {
    const service: Service = {
      id: uuidv7(),
      ...params,
    };

    this.services.push(service);

    return service;
  }

  public static findById(id: string) {
    const findedService = this.services.find(service => service.id === id);

    if (!findedService) {
      return null;
    }

    return findedService;
  }

  public static findAll() {
    if (this.services.length === 0) {
      return [];
    }

    return this.services;
  }
}
