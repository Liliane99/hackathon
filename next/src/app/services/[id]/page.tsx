'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Service } from '../../../schemas/service'
import { ServiceRepository } from '../../../mocks/service'
import DynamicForm from '../../components/service/DynamicForm'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import ReactMarkdown from 'react-markdown'

export default function ServiceFormPage() {
  const { id } = useParams()
  const [service, setService] = useState<Service | null>(null)
  const [response, setResponse] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  
  useEffect(() => {
    if (typeof id === 'string') {
      const fetchedService = ServiceRepository.findById(id)
      if (fetchedService) {
        setService(fetchedService)
      } else {
        setError("Service introuvable")
      }
    }
  }, [id])

  const formatMessageFromData = (data: Record<string, any>): string => {
	return Object.entries(data)
	  .map(([key, value]) => `${key} : ${value}`)
	  .join('\n');
  };
  

  const handleSubmit = async (data: Record<string, any>) => {
    if (!service || service.type !== 'ai') return

    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const message = formatMessageFromData(data)

      const res = await fetch(service.agentAi.endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${service.agentAi.token}`,
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

  if (!service) {
    return <p className="p-6 text-muted-foreground">Chargement du service...</p>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{service.name}</h1>
      <p className="mb-6 text-muted-foreground">{service.description}</p>

      {service.type === 'ai' && (
        <DynamicForm
          fields={service.form}
          onSubmit={handleSubmit}
          submitLabel={loading ? "Chargement..." : "Envoyer"}
        />
      )}

      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Résultat</DialogTitle>
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
