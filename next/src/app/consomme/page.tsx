'use client'

import React, { useState } from 'react'
import { Service } from '../../schemas/service'
import DynamicForm from '../components/service/DynamicForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import ReactMarkdown from 'react-markdown'

// MOCK de service pour test
const mockService: Service = {
  id: "1a2b3c4d-5e6f-7g8h-9i10-j11k12l13m14",
  name: "Génération d'offre d'emploi",
  description: "Un service de génération d'offre d'emploi.",
  contractor: {
    id: "contractor-1",
    name: "DesignFactory",
    email: "contact@designfactory.com",
    phoneNumber: "+1234567890",
  },
  type: "ai",
  agentAi: {
    id: "joboffer",
    endpointUrl: "http://localhost:8080/joboffer/invoke",
    modelName: "llm",
    token: "token",
    inputParameters: ["offerName", "companyName", "offerLocation", "offerMissions", "offerSkills", "offerContractType"],
  },
  form: [
    {
      type: "text",
      label: "Titre de l'offre",
      name: "offerName",
      required: true,
    },
    {
      type: "text",
      label: "Nom de l'entreprise",
      name: "companyName",
      required: true,
    },
    {
      type: "text",
      label: "Lieu de l'offre d'emploi",
      name: "offerLocation",
      required: true,
    },
    {
      type: "text",
      label: "Missions",
      name: "offerMissions",
      required: true
    },
    {
      type: "text",
      label: "Compétences",
      name: "offerSkills",
      required: true
    },
    {
      type: "select",
      label: "Type de contrat",
      name: "offerContractType",
      required: true,
      options: ["CDI", "CDD", "Stage", "Alternance", "Freelance"],
    }
  ],
  price: 49.99,
}

export default function ServiceFormPage() {
  const [response, setResponse] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fonction pour transformer l'objet structuré en message texte
  const formatMessageFromData = (data: Record<string, any>): string => {
    return `
Titre : ${data.offerName}
Entreprise : ${data.companyName}
Lieu : ${data.offerLocation}
Missions :
${data.offerMissions}
Compétences :
${data.offerSkills}
Type de contrat : ${data.offerContractType}
    `.trim()
  }

  const handleSubmit = async (data: Record<string, any>) => {
    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const message = formatMessageFromData(data)

      const res = await fetch(mockService.agentAi.endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer test-token`,
        },
        body: JSON.stringify({ message }),
      })

      if (!res.ok) {
        throw new Error(`Erreur serveur: ${res.statusText}`)
      }

      const result = await res.json()
      setResponse(result.content)
      setOpen(true)

    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{mockService.name}</h1>
      <p className="mb-6 text-muted-foreground">{mockService.description}</p>

      {mockService.type === 'ai' && (
        <DynamicForm 
          fields={mockService.form}
          onSubmit={handleSubmit}
          submitLabel={loading ? "Chargement..." : "Envoyer"}
        />
      )}

      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}

      {/* ✅ Dialog pour afficher la réponse */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Résultat généré par l'IA</DialogTitle>
          </DialogHeader>
          {response ? (
            <div className="prose dark:prose-invert max-h-[60vh] overflow-y-auto">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Aucune réponse à afficher.</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
