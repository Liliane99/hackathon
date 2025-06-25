import React, { useState } from "react";
import { Search, Zap } from "lucide-react";

const SearchBar = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [isFocused, setIsFocused] = useState(false);

	const handleSearch = (e) => {
		e.preventDefault();
		if (searchQuery.trim()) {
		  console.log("Recherche pour:", searchQuery);
		  
		  // Logique d'affichage de la recherche ici
		  // A faire après le mock des agents IA 
		}
	};

	return (
		<div className="w-full max-w-2xl mb-8">
			<div className="relative group">
				<div className={`relative bg-white rounded-full shadow-lg transition-all duration-300 ${
					isFocused ? 'shadow-2xl scale-105 ring-4 ring-blue-500/20' : 'hover:shadow-xl'
				}`}>
					<div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
						<Search className={`w-6 h-6 transition-colors duration-300 ${
							isFocused ? 'text-blue-600' : 'text-gray-400'
						}`} />
					</div>
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handleSearch(e);
							}
						}}
						placeholder="Rechercher un agent IA..."
						className="w-full py-4 pl-16 pr-20 text-lg bg-transparent rounded-full focus:outline-none placeholder-gray-500"
					/>
					<div className="absolute inset-y-0 right-0 pr-2 flex items-center">
						<button
							onClick={handleSearch}
							className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg"
						>
							<Zap className="w-4 h-4" />
							Chercher
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchBar;