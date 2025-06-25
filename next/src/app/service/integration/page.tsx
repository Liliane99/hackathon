"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Bot, User, Sparkles, Settings, Zap, FileText, DollarSign, Calendar } from "lucide-react";
import JsonEditor from "../../components/service/jsonEditor"; 
import { z } from "zod";

// Schema de validation simulé
const serviceSchema = z.object({
  type: z.string().nonempty("Le type est requis."),
  name: z.string().nonempty("Le nom est requis."),
  description: z.string().nonempty("La description est requise."),
  price: z.number().optional(),
  pricePerDays: z.number().optional(),
  agentAi: z.object({
    model: z.string().nonempty("Le modèle IA est requis."),
    temperature: z.number().min(0).max(1).optional(),
    systemPrompt: z.string().optional()
  }).optional()
});

export default function HomePage() {
  const [serviceType, setServiceType] = useState("ai");
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver ? zodResolver(serviceSchema) : undefined,
    defaultValues: {
      type: "ai",
    }
  });

  const watchedType = watch("type");

  const onSubmit = (data) => {
    console.log("Données du formulaire:", data);
  };

  const handleTypeChange = (newType) => {
    setServiceType(newType);
    reset({
      type: newType,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Fond animé avec effets de lumière */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Formes géométriques flottantes */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-violet-500/30 rotate-45 animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-purple-500/30 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-indigo-500/30 rotate-12 animate-float" style={{animationDelay: '2s'}}></div>

      <div className="relative z-10">
        {/* Header avec gradient */}
        <div className="text-center py-12 px-4">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 backdrop-blur-sm border border-violet-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-violet-300 text-sm font-medium">Créateur de Services</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-4">
            Créer votre service
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Configurez votre service IA ou humain avec notre interface intuitive et moderne
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4 pb-12">
          {/* Formulaire principal */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 mb-8 shadow-2xl">
            <div className="space-y-8">
              
              {/* Sélection du type avec cards */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-200 mb-4">
                  <Settings className="inline w-4 h-4 mr-2" />
                  Type de service
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className={`relative group cursor-pointer`}>
                    <input
                      type="radio"
                      value="ai"
                      {...register("type")}
                      onChange={() => handleTypeChange("ai")}
                      className="sr-only"
                    />
                    <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      watchedType === "ai" 
                        ? "border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/20" 
                        : "border-slate-600 bg-slate-700/30 hover:border-slate-500"
                    }`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg ${
                          watchedType === "ai" ? "bg-violet-500/20" : "bg-slate-600/50"
                        }`}>
                          <Bot className={`w-5 h-5 ${
                            watchedType === "ai" ? "text-violet-400" : "text-slate-400"
                          }`} />
                        </div>
                        <h3 className="font-semibold text-slate-200">Service IA</h3>
                      </div>
                      <p className="text-sm text-slate-400">
                        Automatisé et intelligent, parfait pour les tâches répétitives
                      </p>
                    </div>
                  </label>

                  <label className={`relative group cursor-pointer`}>
                    <input
                      type="radio"
                      value="human"
                      {...register("type")}
                      onChange={() => handleTypeChange("human")}
                      className="sr-only"
                    />
                    <div className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      watchedType === "human" 
                        ? "border-violet-500 bg-violet-500/10 shadow-lg shadow-violet-500/20" 
                        : "border-slate-600 bg-slate-700/30 hover:border-slate-500"
                    }`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg ${
                          watchedType === "human" ? "bg-violet-500/20" : "bg-slate-600/50"
                        }`}>
                          <User className={`w-5 h-5 ${
                            watchedType === "human" ? "text-violet-400" : "text-slate-400"
                          }`} />
                        </div>
                        <h3 className="font-semibold text-slate-200">Service Humain</h3>
                      </div>
                      <p className="text-sm text-slate-400">
                        Expertise humaine pour des tâches complexes et créatives
                      </p>
                    </div>
                  </label>
                </div>
                {errors.type && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {errors.type.message}
                  </p>
                )}
              </div>

              {/* Champs de base */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-200">
                    <FileText className="inline w-4 h-4 mr-2" />
                    Nom du service
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-slate-200 placeholder-slate-400 transition-all duration-200"
                    placeholder="Nom du service"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-200">
                    <DollarSign className="inline w-4 h-4 mr-2" />
                    {watchedType === "ai" ? "Prix" : "Prix par jour"}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register(watchedType === "ai" ? "price" : "pricePerDays", { valueAsNumber: true })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-slate-200 placeholder-slate-400 transition-all duration-200"
                    placeholder="0.00"
                  />
                  {(errors.price || errors.pricePerDays) && (
                    <p className="text-red-400 text-sm">
                      {errors.price?.message || errors.pricePerDays?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-200">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-slate-200 placeholder-slate-400 transition-all duration-200 resize-none"
                  rows={4}
                  placeholder="Décrivez votre service en détail..."
                />
                {errors.description && (
                  <p className="text-red-400 text-sm">{errors.description.message}</p>
                )}
              </div>

              {/* Configuration spécifique IA */}
              {watchedType === "ai" && (
                <div className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6 space-y-6">
                  <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                    <Bot className="w-5 h-5 text-violet-400" />
                    Configuration Agent IA
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-200">
                        Modèle IA
                      </label>
                      <select
                        {...register("agentAi.model")}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-slate-200"
                      >
                        <option value="">Choisir un modèle</option>
                        <option value="gpt-4">GPT-4</option>
                        <option value="claude-3">Claude 3</option>
                        <option value="gemini-pro">Gemini Pro</option>
                      </select>
                      {errors.agentAi?.model && (
                        <p className="text-red-400 text-sm">{errors.agentAi.model.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-200">
                        Température
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        {...register("agentAi.temperature", { valueAsNumber: true })}
                        className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-200">
                      Prompt système
                    </label>
                    <textarea
                      {...register("agentAi.systemPrompt")}
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-slate-200 placeholder-slate-400 transition-all duration-200 resize-none"
                      rows={3}
                      placeholder="Instructions pour l'agent IA..."
                    />
                    {errors.agentAi?.systemPrompt && (
                      <p className="text-red-400 text-sm">{errors.agentAi.systemPrompt.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Bouton de soumission */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/25 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Créer le service
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Section JSON Editor */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-violet-400" />
              Éditeur JSON
            </h2>
            <JsonEditor />
          </div>
        </div>
      </div>
    </div>
  );
}