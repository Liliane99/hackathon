"use client";
import React, { useState } from 'react';
import { Calendar, Users, MapPin, Clock, ChevronRight, Filter } from 'lucide-react';

const EventsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const events = {
    webinaires: [
      {
        id: 1,
        title: "Lancement du 1er webinaire Préparation com",
        date: "2 sept. 2025",
        time: "14:00",
        participants: "J-21",
        description: "Choix du salon cible + début de veille concurrentielle",
        status: "upcoming",
        location: undefined
      },
      {
        id: 2,
        title: "2e webinaire",
        date: "4 nov. 2025",
        time: "14:00",
        participants: "TBD",
        description: "Validation de la participation au salon",
        status: "upcoming",
        location: undefined
      },
      {
        id: 3,
        title: "3e webinaire",
        date: "2 déc. 2025",
        time: "14:00",
        participants: "TBD",
        description: "Préparation concept stand + début production com",
        status: "upcoming"
      },
      {
        id: 4,
        title: "4e webinaire",
        date: "6 janv. 2026",
        time: "14:00",
        participants: "TBD",
        description: "Booking hôtel, logistique, animations",
        status: "upcoming"
      },
      {
        id: 5,
        title: "5e webinaire",
        date: "3 févr. 2026",
        time: "14:00",
        participants: "TBD",
        description: "Début campagne teaser participation",
        status: "upcoming"
      },
      {
        id: 6,
        title: "7e webinaire",
        date: "3 mars 2026",
        time: "14:00",
        participants: "TBD",
        description: "Salon professionnel (ex : AI Paris)",
        status: "upcoming"
      },
      {
        id: 7,
        title: "8e webinaire",
        date: "7 avr. 2026",
        time: "14:00",
        participants: "TBD",
        description: "Début salon + relances leads",
        status: "upcoming"
      },
      {
        id: 8,
        title: "9e webinaire",
        date: "5 mai 2026",
        time: "14:00",
        participants: "TBD",
        description: "",
        status: "upcoming"
      },
      {
        id: 9,
        title: "10e webinaire",
        date: "2 juin 2026",
        time: "14:00",
        participants: "TBD",
        description: "",
        status: "upcoming"
      },
      {
        id: 10,
        title: "11e webinaire",
        date: "4 août 2026",
        time: "14:00",
        participants: "TBD",
        description: "",
        status: "upcoming"
      },
      {
        id: 11,
        title: "12e webinaire Relance après pause estivale",
        date: "8 sept. 2026",
        time: "14:00",
        participants: "TBD",
        description: "Recadrage stratégie salon 2026-27",
        status: "upcoming"
      }
    ],
    craft_talks: [
      {
        id: 12,
        title: "1er Craft Talk (préparation des jeux)",
        date: "2 déc. 2025",
        time: "16:00",
        participants: "Équipe",
        description: "Préparation des activités et jeux interactifs",
        status: "upcoming"
      },
      {
        id: 13,
        title: "2e Craft Talk (préparation des jeux)",
        date: "3 mars 2026",
        time: "16:00",
        participants: "Équipe",
        description: "Finalisation des activités salon",
        status: "upcoming"
      },
      {
        id: 14,
        title: "3e Craft Talk (préparation des jeux)",
        date: "8 sept. 2026",
        time: "16:00",
        participants: "Équipe",
        description: "Préparation nouvelle saison",
        status: "upcoming"
      }
    ],
    salons: [
      {
        id: 15,
        title: "Salon professionnel",
        date: "1 avr. 2026",
        time: "09:00-18:00",
        participants: "Équipe + visiteurs",
        description: "Participation au salon professionnel avec stand",
        location: "Paris",
        status: "featured"
      }
    ]
  };

  const allEvents = [...events.webinaires, ...events.craft_talks, ...events.salons];

  const getFilteredEvents = () => {
    switch(activeCategory) {
      case 'webinaires':
        return events.webinaires;
      case 'craft_talks':
        return events.craft_talks;
      case 'salons':
        return events.salons;
      default:
        return allEvents;
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'webinaires':
        return '🎥';
      case 'craft_talks':
        return '💬';
      case 'salons':
        return '🏢';
      default:
        return '📅';
    }
  };

  const getEventCategory = (eventId) => {
    if (events.webinaires.find(e => e.id === eventId)) return 'webinaires';
    if (events.craft_talks.find(e => e.id === eventId)) return 'craft_talks';
    if (events.salons.find(e => e.id === eventId)) return 'salons';
    return 'other';
  };

  return (
    <div className="min-h-screen" style={{
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)'
    }}>
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
        <div className="relative px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Événements BRIEF & CRAFT
            </h1>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              Découvrez notre calendrier d'événements : webinaires, tables rondes et salons professionnels
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Categories */}
      <div className="sticky top-0 z-10 backdrop-blur-lg border-b" style={{
        backgroundColor: 'var(--background)',
        borderColor: 'var(--border)'
      }}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { key: 'all', label: 'Tous les événements', icon: '📅' },
              { key: 'webinaires', label: 'Webinaires', icon: '🎥' },
              { key: 'craft_talks', label: 'Tables Rondes', icon: '💬' },
              { key: 'salons', label: 'Salons', icon: '🏢' }
            ].map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category.key
                    ? 'text-white shadow-lg transform scale-105'
                    : 'hover:scale-105'
                }`}
                style={{
                  backgroundColor: activeCategory === category.key ? 'var(--primary)' : 'var(--card)',
                  color: activeCategory === category.key ? 'var(--primary-foreground)' : 'var(--card-foreground)'
                }}
              >
                <span>{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {getFilteredEvents().map((event) => {
            const category = getEventCategory(event.id);
            return (
              <div
                key={event.id}
                className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer"
                style={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)'
                }}
              >
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: 'var(--primary-foreground)'
                    }}
                  >
                    {getCategoryIcon(category)}
                    {category === 'webinaires' ? 'Webinaire' : 
                     category === 'craft_talks' ? 'Table Ronde' : 'Salon'}
                  </span>
                </div>

                {/* Status Badge */}
                {event.status === 'featured' && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 text-black">
                      ⭐ Événement phare
                    </span>
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 group-hover:from-purple-500/20 group-hover:to-blue-500/20 transition-all duration-500"></div>

                <div className="relative p-6">
                  {/* Date */}
                  <div className="flex items-center gap-2 mb-4 opacity-75">
                    <Calendar size={16} />
                    <span className="text-sm font-medium">{event.date}</span>
                    {event.time && (
                      <>
                        <Clock size={16} className="ml-2" />
                        <span className="text-sm">{event.time}</span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors duration-300">
                    {event.title}
                  </h3>

                  {/* Description */}
                  {event.description && (
                    <p className="opacity-80 mb-4 line-clamp-3">
                      {event.description}
                    </p>
                  )}

                  {/* Participants */}
                  <div className="flex items-center gap-2 mb-4 opacity-75">
                    <Users size={16} />
                    <span className="text-sm">{event.participants}</span>
                  </div>

                

                  {/* Action Button */}
                  <div className="pt-4">
                    <button 
                      className="w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
                      style={{
                        backgroundColor: 'var(--primary)',
                        color: 'var(--primary-foreground)'
                      }}
                    >
                      En savoir plus
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {getFilteredEvents().length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-2xl font-bold mb-2">Aucun événement trouvé</h3>
            <p className="opacity-75">Essayez de changer de catégorie ou revenez plus tard</p>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">
            Restez connecté à nos événements
          </h2>
          <p className="text-xl opacity-80 mb-8">
            Inscrivez-vous à notre newsletter pour ne manquer aucun événement
          </p>
          <button 
            className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)'
            }}
          >
            S'inscrire à la newsletter
          </button>
        </div>
      </div>

      <style jsx global>{`
        :root {
          --radius: 0.625rem;
          --background: oklch(0.99 0.005 280);
          --foreground: oklch(0.12 0.02 280);
          --card: oklch(0.98 0.01 280);
          --card-foreground: oklch(0.12 0.02 280);
          --primary: oklch(0.6 0.2 280);
          --primary-foreground: oklch(0.98 0.01 280);
          --secondary: oklch(0.85 0.15 285);
          --secondary-foreground: oklch(0.12 0.02 280);
          --muted: oklch(0.92 0.01 280);
          --muted-foreground: oklch(0.4 0.02 280);
          --accent: oklch(0.7 0.18 300);
          --accent-foreground: oklch(0.98 0.01 280);
          --border: oklch(0.75 0.12 285);
          --ring: oklch(0.6 0.2 280);
        }

        .dark {
          --background: oklch(0.08 0.01 280);
          --foreground: oklch(0.95 0.01 280);
          --card: oklch(0.11 0.015 280);
          --card-foreground: oklch(0.94 0.01 280);
          --primary: oklch(0.65 0.22 280);
          --primary-foreground: oklch(0.08 0.01 280);
          --secondary: oklch(0.25 0.1 285);
          --secondary-foreground: oklch(0.94 0.01 280);
          --muted: oklch(0.18 0.01 280);
          --muted-foreground: oklch(0.75 0.01 280);
          --accent: oklch(0.6 0.18 300);
          --accent-foreground: oklch(0.08 0.01 280);
          --border: oklch(0.3 0.08 285);
          --ring: oklch(0.65 0.22 280);
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default EventsPage;
