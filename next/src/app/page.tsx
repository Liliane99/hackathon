import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import {
  Users,
  Bot,
  Zap,
  Target,
  ArrowRight,
  Clock,
  Shield,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                  Nouvelle plateforme
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Créez votre équipe
                  <span className="text-primary"> parfaite</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  La plateforme qui connecte vos projets avec les meilleurs talents humains
                  et agents IA pour réussir vos développements.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/team">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Commencer maintenant
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/profiles/all">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Découvrir les profils
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-gray-600">Experts disponibles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-gray-600">Agents IA</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">98%</div>
                  <div className="text-sm text-gray-600">Satisfaction client</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <Card className="transform rotate-2 hover:rotate-0 transition-transform">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Équipes expertes</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Développeurs, designers, PO expérimentés</p>
                  </CardContent>
                </Card>

                <Card className="transform -rotate-2 hover:rotate-0 transition-transform mt-8">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Agents IA</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Automatisation RH, code review, tests</p>
                  </CardContent>
                </Card>

                <Card className="transform rotate-1 hover:rotate-0 transition-transform -mt-4">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Matching IA</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Algorithme intelligent pour l'équipe parfaite</p>
                  </CardContent>
                </Card>

                <Card className="transform -rotate-1 hover:rotate-0 transition-transform">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Projets réussis</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">De l'idée à la production en toute sérénité</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir TeamBuilder ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une approche révolutionnaire qui combine talents humains et intelligence artificielle
              pour des projets exceptionnels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Rapidité</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Constituez votre équipe en moins de 24h grâce à notre algorithme de matching intelligent.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Qualité garantie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Tous nos talents sont vérifiés et notés par la communauté. Qualité assurée sur chaque projet.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>IA intégrée</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Agents IA spécialisés pour automatiser les tâches répétitives et booster la productivité.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600">
              En 3 étapes simples, créez l'équipe de vos rêves
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Décrivez votre projet</h3>
              <p className="text-gray-600">
                Expliquez vos besoins, technologies et objectifs. Notre IA analyse votre demande.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Découvrez votre équipe</h3>
              <p className="text-gray-600">
                Nous vous proposons l'équipe type parfaite : humains experts et agents IA adaptés.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Lancez votre projet</h3>
              <p className="text-gray-600">
                Validez votre équipe et démarrez immédiatement. Suivez le progrès en temps réel.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-700"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Prêt à créer votre équipe de rêve ?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Rejoignez les centaines d'entreprises qui nous font confiance pour leurs projets les plus ambitieux.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/team">
              <Button size="lg" variant="secondary" className="group">
                Commencer gratuitement
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/profiles/all">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                Explorer les talents
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
