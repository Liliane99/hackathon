"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import JsonEditor from "../../components/service/jsonEditor";
import {serviceSchema} from "../../../schemas/service";

export default function HomePage() {
  const [serviceType, setServiceType] = useState("ai");
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      type: "ai",
      // Ajoutez ici les valeurs par défaut selon votre baseServiceSchema
    }
  });

  const watchedType = watch("type");

  const onSubmit = (data) => {
    console.log("Données du formulaire:", data);
    // Traitez vos données ici
  };

  const handleTypeChange = (newType) => {
    setServiceType(newType);
    reset({
      type: newType,
      // Réinitialisez avec les valeurs par défaut selon le type
    });
  };

  return (
    <main className="p-8">
      <h1 className="text-xl font-bold mb-4">Créer votre formulaire !</h1>
      
      <div className="mb-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Sélection du type de service */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type de service
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="ai"
                  {...register("type")}
                  onChange={() => handleTypeChange("ai")}
                  className="mr-2"
                />
                Service IA
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="human"
                  {...register("type")}
                  onChange={() => handleTypeChange("human")}
                  className="mr-2"
                />
                Service Humain
              </label>
            </div>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          {/* Champs communs du baseServiceSchema */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom du service
            </label>
            <input
              type="text"
              {...register("name")} // Ajustez selon votre baseServiceSchema
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez le nom du service"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...register("description")} // Ajustez selon votre baseServiceSchema
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Décrivez votre service"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Champs spécifiques au service IA */}
          {watchedType === "ai" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix
                </label>
                <input
                  type="number"
                  step="0.01"
                  {...register("price", { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Prix du service IA"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                )}
              </div>

              {/* Champs pour agentAi - Ajustez selon votre agentAiSchema */}
              <div className="border p-4 rounded-md bg-gray-50">
                <h3 className="text-lg font-medium mb-3">Configuration Agent IA</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Modèle IA
                    </label>
                    <input
                      type="text"
                      {...register("agentAi.model")} // Ajustez selon agentAiSchema
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="ex: gpt-4, claude-3"
                    />
                    {errors.agentAi?.model && (
                      <p className="text-red-500 text-sm mt-1">{errors.agentAi.model.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prompt système
                    </label>
                    <textarea
                      {...register("agentAi.systemPrompt")} // Ajustez selon agentAiSchema
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="Instructions pour l'agent IA"
                    />
                    {errors.agentAi?.systemPrompt && (
                      <p className="text-red-500 text-sm mt-1">{errors.agentAi.systemPrompt.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Champs spécifiques au service humain */}
          {watchedType === "human" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prix par jour
              </label>
              <input
                type="number"
                step="0.01"
                {...register("pricePerDays", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Prix par jour"
              />
              {errors.pricePerDays && (
                <p className="text-red-500 text-sm mt-1">{errors.pricePerDays.message}</p>
              )}
            </div>
          )}

          {/* Bouton de soumission */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Créer le service
            </button>
          </div>
        </form>
      </div>

      <div className="border-t pt-8">
        <h2 className="text-lg font-bold mb-4">Éditeur JSON</h2>
        <JsonEditor />
      </div>
    </main>
  );
}