import { NextRequest, NextResponse } from "next/server";
import { getAllServices, searchServices } from "@/lib/api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const category = searchParams.get("category");
  const type = searchParams.get("type");

  try {
    let services;

    if (query) {
      services = await searchServices(query);
    }
    else {
      services = await getAllServices();
    }
    if (category && category !== "all") {
      services = services.filter((service) => {
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
    }

    if (type) {
      services = services.filter(service => service.type === type);
    }

    return NextResponse.json({
      data: services,
      success: true,
      total: services.length,
    });
  }
  catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la récupération des services",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
