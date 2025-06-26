'use client'

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '../app/components/ui/card';
import { Button } from '../app/components/ui/button';
import { Badge } from '../app/components/ui/badge';
import {
	Zap,
	Check,
	Star,
	Crown,
	Rocket,
	Building
} from 'lucide-react';

const plans = [
	{
		id: "starter",
		title: "Starter",
		price: "0€",
		subtitle: "Curieux, porteurs d'idée",
		icon: <Star className="h-6 w-6 text-green-600" />,
		iconBg: "bg-green-100",
		button: "Gratuit",
		features: [
			"1 projet actif",
			"Analyse IA complète + guide « pas à pas »",
			"2 équipes-type générées"
		]
	},
	{
		id: "builder",
		title: "Builder",
		price: "29€",
		subtitle: "Freelances ou petites structures",
		icon: <Zap className="h-6 w-6 text-blue-600" />,
		iconBg: "bg-blue-100",
		button: "Choisir Builder",
		features: [
			"Jusqu'à 3 projets",
			"5 000 chats / mois",
			"Personnalisation avancée",
			"Équipes-type illimitées",
			"1 rendez-vous conseil (30min)"
		]
	},
	{
		id: "pro",
		title: "Pro Launch",
		price: "79€",
		subtitle: "TPE / commerces physiques",
		icon: <Rocket className="h-6 w-6 text-primary" />,
		iconBg: "bg-primary/10",
		button: "Choisir Pro Launch",
		features: [
			"10 000 chats / mois",
			"5 projets actifs",
			"Profils réels + estimation tarifaire",
			"Escrow & contrats intégrés",
			"Tableau de bord ROI"
		],
		recommended: true
	},
	{
		id: "scaleup",
		title: "Scale-Up",
		price: "199€",
		subtitle: "Multi-points de vente / franchises",
		icon: <Crown className="h-6 w-6 text-purple-600" />,
		iconBg: "bg-purple-100",
		button: "Choisir Scale-Up",
		features: [
			"Projets illimités",
			"Équipe multi-utilisateurs",
			"Matching prioritaire premium",
			"Intégrations API",
			"SLA 99,9% + CSM dédié"
		]
	},
	{
		id: "enterprise",
		title: "Enterprise",
		price: "Sur devis",
		subtitle: "Groupes / réseaux de franchises",
		icon: <Building className="h-6 w-6 text-gray-600" />,
		iconBg: "bg-gray-100",
		button: "Nous contacter",
		features: [
			"Hébergement privé EU",
			"SSO & gouvernance",
			"Marketplace fermée",
			"Formations sur site",
			"Support 24/7"
		]
	}
];

export default function Pricing() {
	const [selectedPlan, setSelectedPlan] = useState(null);

	return (
		<section className="py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
						Choisissez votre formule
					</h2>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto">
						Des solutions adaptées à chaque étape de votre croissance, de l'idée à l'entreprise
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
					{plans.map(plan => (
						<Card
							key={plan.id}
							onClick={() => setSelectedPlan(plan.id)}
							className={`relative flex flex-col bg-white justify-between h-full border-2 transition-all duration-300 cursor-pointer ${
								selectedPlan === plan.id
									? "border-primary shadow-xl ring-2 ring-primary/40"
									: "border-gray-200 hover:border-primary/30 hover:shadow-lg"
							} ${!selectedPlan && plan.recommended ? "scale-105 shadow-lg border-primary" : ""}`}
						>
							{/* Badge "Recommandé" seulement si non sélectionné */}
							{plan.recommended && selectedPlan === null && (
								<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
									<Badge className="bg-primary text-white px-3 py-1">
										Recommandé
									</Badge>
								</div>
							)}

							<CardHeader className="text-center pb-6">
								<div className={`w-12 h-12 ${plan.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
									{plan.icon}
								</div>
								<CardTitle className="text-xl font-bold">{plan.title}</CardTitle>
								<div className="mt-4">
									<span className="text-3xl font-bold text-gray-900">{plan.price}</span>
									{!plan.price.includes("devis") && <span className="text-gray-600">/mois</span>}
								</div>
								<p className="text-sm text-gray-600 mt-2">{plan.subtitle}</p>
							</CardHeader>

							<CardContent className="flex flex-col flex-grow space-y-3">
								{plan.features.map((feature, index) => (
									<div key={index} className="flex items-start gap-2">
										<Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
										<span className="text-sm text-gray-700">{feature}</span>
									</div>
								))}
								<div className="pt-4 mt-auto">
									<Button className="w-full bg-primary text-white hover:bg-primary/90">
										{plan.button}
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="mt-12 text-center">
					<p className="text-gray-600 mb-6">
						Toutes les formules incluent une garantie satisfait ou remboursé de 30 jours
					</p>
					<div className="flex justify-center items-center gap-4">
						<Badge variant="outline" className="px-3 py-1">
							Sans engagement
						</Badge>
						<Badge variant="outline" className="px-3 py-1">
							Support inclus
						</Badge>
						<Badge variant="outline" className="px-3 py-1">
							Facturation mensuelle
						</Badge>
					</div>
				</div>
			</div>
		</section>
	);
}
