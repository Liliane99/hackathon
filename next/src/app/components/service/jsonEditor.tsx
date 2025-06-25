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

      <div className="w-1/2">
        <h2 className="text-lg font-semibold mb-4">
          Aperçu du formulaire
          {parsedFields.length > 0 && (
            <span className="text-sm text-gray-500 ml-2">
              ({parsedFields.length} champ{parsedFields.length > 1 ? 's' : ''})
            </span>
          )}
          {error && error.includes('erreur de syntaxe') && (
            <span className="text-xs text-red-500 ml-2 font-normal">
              (Version figée)
            </span>
          )}
        </h2>
        {parsedFields.length > 0 ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {parsedFields.map((field) => {
              // Vérification de sécurité pour éviter les erreurs undefined
              if (!field || !field.name || !field.type) {
                console.warn("Champ invalide ignoré:", field);
                return null;
              }

              return (
                <div key={field.name} className="flex flex-col">
                  <label className="mb-1 font-medium">{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      {...register(field.name, {
                        required: field.required ?? false,
                      })}
                      className="border rounded p-2"
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
                      {...register(field.name, {
                        required: field.required ?? false,
                      })}
                      className="border rounded p-2"
                      {...(field.type === 'number' && 'min' in field && field.min !== undefined ? { min: field.min } : {})}
                      {...(field.type === 'number' && 'max' in field && field.max !== undefined ? { max: field.max } : {})}
                    />
                  )}
                  {errors[field.name] && (
                    <span className="text-red-500 text-sm">
                      Ce champ est requis
                    </span>
                  )}
                </div>
              );
            }).filter(Boolean)}

            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Envoyer
            </button>
          </form>
        ) : (
          <p className="text-gray-500 italic">Aucun champ valide à afficher.</p>
        )}
      </div>
    </div>
  );
}
