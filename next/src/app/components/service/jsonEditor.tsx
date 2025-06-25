"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useForm } from "react-hook-form";
import {FormField, formSchema} from "../../../schemas/formBuilder";

const defaultJson = `[
  {
	"label": "Nom",
	"name": "name",
	"type": "text",
	"required": true
  }
]`;

export default function JsonEditor() {
  const [jsonInput, setJsonInput] = useState<string>(defaultJson);

  const [parsedFields, setParsedFields] = useState<FormField[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [lastValidField, setLastValidField] = useState<string>(defaultJson);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    parseJson(defaultJson);
  }, []);

  // Réinitialiser le formulaire quand les champs changent pour éviter les conflits
  useEffect(() => {
    if (parsedFields.length > 0) {
      reset();
    }
  }, [parsedFields, reset]);

  const parseJson = (value: string) => {
    try {
      const parsed = JSON.parse(value);
      
      if (!Array.isArray(parsed)) {
        setError("❌ Le JSON doit être un tableau de champs");
        return;
      }

      const validFields: FormField[] = [];
      const invalidFieldsNames: string[] = [];
      
      parsed.forEach(
		(field, index) => {
				try {
					const validField = formSchema.parse(field);
					validFields.push(validField);
				} catch (fieldErr: unknown) {
					const fieldName = field?.name || field?.label || `Champ ${index + 1}`;
					invalidFieldsNames.push(fieldName);
				}
			}
	  );

      setParsedFields(validFields);
      setInvalidFields(invalidFieldsNames);
      setLastValidField(value);
      
      if (invalidFieldsNames.length > 0) {
        setError(`⚠️ ${invalidFieldsNames.length} champ(s) ignoré(s): ${invalidFieldsNames.join(', ')}`);
      } else {
        setError(null);
      }
      
    } catch (err) {
      setError("❌ JSON invalide - erreur de syntaxe (preview figée sur la dernière version valide)");
    }
  };

  const onEditorChange = (value: string | undefined) => {
    if (!value) return;

    setJsonInput(value);
    parseJson(value);
  };

  const restoreLastValidJson = () => {
    setJsonInput(lastValidField);
    parseJson(lastValidField);
  };

  const onSubmit = (data: unknown) => {
    console.log("Form submitted ✅", data);
  };

  return (
    <div className="flex gap-6 p-6">
      <div className="w-1/2 h-[500px] border rounded">
        <Editor
          height="100%"
          defaultLanguage="json"
          value={jsonInput}
          onChange={onEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            automaticLayout: true,
          }}
        />
        {error && (
          <div className="mt-2 text-sm">
            {error.startsWith('⚠️') ? (
              <p className="text-yellow-600 bg-yellow-50 p-2 rounded">{error}</p>
            ) : (
              <div className="text-red-500 bg-red-50 p-2 rounded">
                <p>{error}</p>
                {error.includes('erreur de syntaxe') && (
                  <button
                    onClick={restoreLastValidJson}
                    className="mt-2 text-xs bg-red-100 hover:bg-red-200 px-2 py-1 rounded border border-red-300"
                  >
                    🔄 Restaurer la dernière version valide
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 space-y-5">
  <div className="flex items-center justify-between pb-3">
    <h3 className="text-lg font-medium text-slate-200">
      Aperçu du formulaire
    </h3>
    {parsedFields.length > 0 && (
      <span className="px-2 py-1 bg-violet-500/20 text-violet-300 text-sm rounded border border-violet-500/30">
        {parsedFields.length} champ{parsedFields.length > 1 ? 's' : ''}
      </span>
    )}
    {error && error.includes('erreur de syntaxe') && (
      <span className="px-2 py-1 bg-amber-500/20 text-amber-300 text-sm rounded border border-amber-500/30">
        Version figée
      </span>
    )}
  </div>

  {parsedFields.length > 0 ? (
    <form className="space-y-4">
      {parsedFields.map((field) => {
        // Vérification de sécurité pour éviter les erreurs undefined
        if (!field || !field.name || !field.type) {
          console.warn("Champ invalide ignoré:", field);
          return null;
        }
        
        return (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              {field.label}
            </label>
            {field.type === 'select' ? (
              <select
                name={field.name}
                required={field.required}
                className="w-full px-3 py-2 rounded border border-slate-600 bg-slate-700/50 text-slate-200
                         focus:border-violet-400 focus:ring-1 focus:ring-violet-400/50 focus:outline-none
                         transition-colors"
              >
                <option value="">Sélectionnez...</option>
                {'options' in field && Array.isArray(field.options) && field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                required={field.required}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 rounded border border-slate-600 bg-slate-700/50 text-slate-200
                         focus:border-violet-400 focus:ring-1 focus:ring-violet-400/50 focus:outline-none
                         transition-colors placeholder:text-slate-400"
              />
            )}
            {errors[field.name] && (
              <p className="text-sm text-red-400">
                Ce champ est requis
              </p>
            )}
          </div>
        );
      }).filter(Boolean)}
      
      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-2 px-4 bg-violet-600 hover:bg-violet-500 text-white rounded
                   transition-colors font-medium"
        >
          Envoyer
        </button>
      </div>
    </form>
  ) : (
    <div className="text-center py-8">
      <p className="text-slate-400">Aucun champ valide à afficher.</p>
    </div>
  )}
</div>
    </div>
  );
}
