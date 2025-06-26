import { ProfileList } from '@/app/components/profiles/ProfileList';
import { ProfileFilters } from '@/app/components/profiles/ProfileFilters';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/constants';
import { SlotCategory } from '@/types';
import { getServicesByCategory } from '@/lib/api';
import { Metadata } from 'next';

interface PageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const categoryName = CATEGORIES[params.category as SlotCategory] || 'Tous les profils';
  
  return {
    title: `${categoryName} - TeamBuilder`,
    description: `Découvrez tous les talents ${categoryName.toLowerCase()} disponibles`,
  };
}

export default async function CategoryProfilesPage({ params }: PageProps) {
  const category = params.category as SlotCategory;
  const categoryName = CATEGORIES[category] || 'Profils';
  let profiles;
  try {
    profiles = await getServicesByCategory(category);
  } catch (error) {
    console.error('Erreur chargement profils:', error);
    profiles = [];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/team">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'équipe
            </Button>
          </Link>
          <Badge variant="secondary">{categoryName}</Badge>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Profils {categoryName}
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Découvrez tous les talents et agents IA disponibles dans la catégorie {categoryName.toLowerCase()}. 
          Cliquez sur un profil pour voir ses détails et l'ajouter à votre équipe.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ProfileFilters />
        </div>
        <div className="lg:col-span-3">
          {profiles.length > 0 ? (
            <ProfileList 
              profiles={profiles} 
              title={`${profiles.length} profil(s) trouvé(s)`}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                Aucun profil trouvé pour cette catégorie.
              </p>
              <Link href="/team">
                <Button variant="outline">
                  Retour à l'équipe
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}