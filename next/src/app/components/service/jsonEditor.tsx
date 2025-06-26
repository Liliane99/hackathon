"use client";

import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { formSchema, FormField } from "../../../schemas/formBuilder";

import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { Badge } from "@/app/components/ui/badge";

import { AlertTriangle, RotateCcw, CheckCircle } from "lucide-react";
import DynamicForm from "@/app/components/service/DynamicForm";

type Props = {
  // eslint-disable-next-line no-unused-vars
  onSendData: (data: FormField[]) => void;
};

const defaultJson = `[
  {
    "label": "Nom",
    "name": "name",
    "type": "text",
    "required": true
  }
]`;

const createDynamicSchema = (fields: FormField[]) => {
  const shape: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    if (field.name) {
      let fieldSchema: z.ZodTypeAny = z.string();

      if (field.type === "email") {
        fieldSchema = z.string().email("Email invalide");
      }
      else if (field.type === "number") {
        fieldSchema = z.string().transform(val => Number(val));
      }

      if (field.required) {
        if (fieldSchema instanceof z.ZodString) {
          fieldSchema = fieldSchema.min(1, "Ce champ est requis");
        }
      }
      else {
        fieldSchema = fieldSchema.optional();
      }

      shape[field.name] = fieldSchema;
    }
  });

  return z.object(shape);
};

export default function JsonEditor({ onSendData }: Props) {
  const [jsonInput, setJsonInput] = useState<string>(defaultJson);
  const [parsedFields, setParsedFields] = useState<FormField[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [_invalidFields, setInvalidFields] = useState<string[]>([]);
  const [lastValidField, setLastValidField] = useState<string>(defaultJson);
  const [dynamicSchema, setDynamicSchema] = useState(z.object({}));

  const form = useForm<Record<string, string>>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: {},
    mode: "onChange",
  });

  const sendData = (data: FormField[]) => {
    onSendData(data);
  };

  useEffect(() => {
    parseJson(defaultJson);
  }, []);

  useEffect(() => {
    if (parsedFields.length > 0) {
      const newSchema = createDynamicSchema(parsedFields);
      setDynamicSchema(newSchema);

      const defaultValues: Record<string, string> = {};
      parsedFields.forEach((field) => {
        if (field.name) {
          defaultValues[field.name] = "";
        }
      });

      form.reset(defaultValues);
    }
  }, [parsedFields, form]);

  const parseJson = (value: string) => {
    try {
      const parsed = JSON.parse(value) as FormField[];
      if (!Array.isArray(parsed)) {
        setError("Le JSON doit être un tableau de champs");
        return;
      }

      const validFields: FormField[] = [];
      const invalidFieldsNames: string[] = [];

      parsed.forEach(
        (field, index) => {
          try {
            const validField = formSchema.parse(field);
            if (validField.type === "select") {
              validField.options.forEach(
                (option) => {
                  if (option.trim() === "") {
                    throw new Error("Option vide");
                  }
                });
            }
            validFields.push(validField);
          }
          catch {
            const fieldName = field?.name || field?.label || `Champ ${index + 1}`;
            invalidFieldsNames.push(fieldName);
          }
        });

      setParsedFields(validFields);
      setInvalidFields(invalidFieldsNames);
      setLastValidField(value);

      if (invalidFieldsNames.length > 0) {
        setError(`${invalidFieldsNames.length} champ(s) ignoré(s): ${invalidFieldsNames.join(", ")}`);
      }
      else {
        setError(null);
        sendData(validFields);
      }
    }
    catch {
      setError("JSON invalide - erreur de syntaxe (preview figée sur la dernière version valide)");
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

  const isWarning = error && !error.includes("JSON invalide");
  const isSyntaxError = error && error.includes("erreur de syntaxe");

  return (
    <div className="flex gap-6 p-6">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Éditeur JSON</CardTitle>
          <CardDescription>
            Définissez la structure de votre formulaire en JSON
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[500px] border rounded-md overflow-hidden border-[var(--border)]">
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
          </div>
          {error && (
            <div className="p-4">
              <Alert variant={isWarning ? "default" : "destructive"}>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="flex items-center justify-between">
                  <span>{error}</span>
                  {isSyntaxError && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={restoreLastValidJson}
                      className="ml-2"
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Restaurer
                    </Button>
                  )}
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="w-1/2 bg-[var(--card)] text-[var(--card-foreground)] border-[var(--border)]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Aperçu du formulaire</CardTitle>
              <CardDescription>
                Prévisualisation en temps réel
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {parsedFields.length > 0 && (
                <Badge className="bg-[var(--accent)] text-[var(--accent-foreground)]">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {parsedFields.length}
                  {" "}
                  champ
                  {parsedFields.length > 1 ? "s" : ""}
                </Badge>
              )}
              {isSyntaxError && (
                <Badge className="bg-[var(--muted)] text-[var(--muted-foreground)]">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Version figée
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {parsedFields.length > 0
            ? (
                <DynamicForm
                  fields={parsedFields}
                  onSubmit={(data) => {
                    console.log("Form data submitted:", data);
                  }}
                  submitLabel="Envoyer"
                />
              )
            : (
                <div className="text-center py-8 text-[var(--muted-foreground)]">
                  Aucun champ valide à afficher.
                </div>
              )}
        </CardContent>
      </Card>
    </div>
  );
}
