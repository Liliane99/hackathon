"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import SearchBar from "../../components/Search";

export default function SearchAgentPage() {
  return (
    <div className="min-h-screen">
      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <Sparkles className="w-12 h-12 text-blue-600 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Que souhaitez vous faire ?
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Expliquez clairement ce dont vous avez besoin, et nous nous occupons du reste
          </p>
        </div>
        <SearchBar />
      </main>
    </div>
  );
}
