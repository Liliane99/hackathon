import { NextRequest, NextResponse } from 'next/server';
import { getTeamById, updateTeam, assignServiceToSlot } from '@/lib/api';
import { mockTeam } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const teamId = searchParams.get('id');
  
  try {
    if (!teamId) {
      return NextResponse.json({
        data: mockTeam,
        success: true
      });
    }
    
    const team = await getTeamById(teamId);
    
    if (!team) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Équipe non trouvée' 
        },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      data: team,
      success: true
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur lors de la récupération de l\'équipe',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, teamId, slotId, serviceId, teamData } = body;
    
    switch (action) {
      case 'assign_service':
        if (!teamId || !slotId || !serviceId) {
          return NextResponse.json(
            { 
              success: false, 
              message: 'Paramètres manquants pour l\'assignation' 
            },
            { status: 400 }
          );
        }
        
        const updatedTeam = await assignServiceToSlot(teamId, slotId, serviceId);
        return NextResponse.json({
          data: updatedTeam,
          success: true,
          message: 'Service assigné avec succès'
        });
        
      case 'update_team':
        if (!teamData) {
          return NextResponse.json(
            { 
              success: false, 
              message: 'Données d\'équipe manquantes' 
            },
            { status: 400 }
          );
        }
        
        const team = await updateTeam(teamData);
        return NextResponse.json({
          data: team,
          success: true,
          message: 'Équipe mise à jour avec succès'
        });
        
      default:
        return NextResponse.json(
          { 
            success: false, 
            message: 'Action non reconnue' 
          },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur lors de la modification de l\'équipe',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const teamData = await request.json();
    const updatedTeam = await updateTeam(teamData);
    
    return NextResponse.json({
      data: updatedTeam,
      success: true,
      message: 'Équipe mise à jour avec succès'
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur lors de la mise à jour de l\'équipe',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}