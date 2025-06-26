import { TeamOrgChart } from "@/app/components/team/TeamOrgChart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Équipe recommandée - TeamBuilder",
  description: "Découvrez l'équipe type recommandée pour votre projet",
};

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TeamOrgChart />
    </div>
  );
}
