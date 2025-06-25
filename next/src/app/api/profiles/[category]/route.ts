import { NextRequest, NextResponse } from 'next/server';
import { getServicesByCategory } from '@/lib/api';
import { SlotCategory } from '@/types';

interface RouteParams {
  params: {
    category: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const type = searchParams.get('type');
  
  try {
    const category = params.category as SlotCategory;
    let profiles = await getServicesByCategory(category);
    if (type && type !== 'all') {
      profiles = profiles.filter(profile => profile.type === type);
    }
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProfiles = profiles.slice(startIndex, endIndex);
    
    return NextResponse.json({
      data: paginatedProfiles,
      pagination: {
        page,
        limit,
        total: profiles.length,
        totalPages: Math.ceil(profiles.length / limit)
      },
      success: true,
      category
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: `Erreur lors de la récupération des profils pour la catégorie ${params.category}`,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}