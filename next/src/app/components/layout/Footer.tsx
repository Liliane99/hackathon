export function Footer() {
    return (
      <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">TeamBuilder</h3>
              <p className="text-gray-600 text-sm">
                La plateforme qui connecte vos projets avec les meilleurs talents et agents IA.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Produit</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-primary">Tarifs</a></li>
                <li><a href="#" className="hover:text-primary">Agents IA</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary">Documentation</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
                <li><a href="#" className="hover:text-primary">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Légal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary">CGU</a></li>
                <li><a href="#" className="hover:text-primary">Confidentialité</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-600">
            © 2025 TeamBuilder. Tous droits réservés.
          </div>
        </div>
      </footer>
    );
  }