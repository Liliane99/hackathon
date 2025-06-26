"use client";

import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Bot,
  User,
  Sparkles,
  Settings,
  FileText,
  DollarSign,
} from "lucide-react";
import { createServiceHumanSchema, createServiceIaSchema, Service } from "@/schemas/service";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { z } from "zod";
import { FormField as JsonFormField } from "@/schemas/formBuilder";
import { ServiceRepository } from "@/mocks/service";
import { uuidv7 } from "uuidv7";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import JsonEditor from "@/app/components/service/jsonEditor";

export default function ServiceIntegrationPage() {
  const [debugMessage, setDebugMessage] = useState<string>("");
  const [serviceType, setServiceType] = useState<Service["type"]>("ai");
  const [jsonData, setJsonData] = useState<JsonFormField[]>([]);
  const router = useRouter();

  const handleJsonEditorData = (data: JsonFormField[]) => {
    setJsonData(data);
  };

  const formIaService = useForm({
    resolver: zodResolver(createServiceIaSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      endpointUrl: "",
      modelName: "",
      token: "",
      form: [],
    },
  });

  const formHumanService = useForm({
    resolver: zodResolver(createServiceHumanSchema),
    defaultValues: {
      name: "",
      description: "",
      pricePerDays: 0,
    },
  });

  function onSubmitHumanService(values: z.infer<typeof createServiceHumanSchema>) {
    ServiceRepository.create({
      type: "human",
      ...values,
    });
    toast("Service humain créé avec succès !");
    router.push("/services");
  }

  function onSubmitIaService(values: z.infer<typeof createServiceIaSchema>) {
    values.form = jsonData;
    ServiceRepository.create({
      type: "ai",
      ...values,
      agentAi: {
        id: uuidv7(),
        endpointUrl: values.endpointUrl,
        modelName: values.modelName,
        token: values.token,
      },
    });
    toast("Service IA créé avec succès !");
    router.push("/services");
  }

  function onError(errors: Record<string, unknown>) {
    const errorCount = Object.keys(errors).length;
    const firstError = Object.keys(errors)[0];
    setDebugMessage(`❌ Erreur de validation: ${errorCount} champ(s) invalide(s). Premier champ: ${firstError}`);
  }

  const handleTypeChange = (value: Service["type"]) => {
    setServiceType(value);
    setDebugMessage("");
  };

  const CommonFieldsIa = (
    { form }: { form: UseFormReturn<z.infer<typeof createServiceIaSchema>> },
  ) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Nom du service
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Nom du service"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Prix
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 0;
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Description */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Décrivez votre service en détail..."
                rows={4}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  const CommonFieldsHuman = ({ form }: { form: UseFormReturn<z.infer<typeof createServiceHumanSchema>> }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Nom du service
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Nom du service"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pricePerDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Prix par jour
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 0;
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Décrivez votre service en détail..."
                rows={4}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="absolute top-1/4 left-10 w-4 h-4 bg-primary/30 rotate-45 animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-secondary/30 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-primary/30 rotate-12 animate-float" style={{ animationDelay: "2s" }}></div>

      <div className="relative z-10">
        <div className="text-center py-12 px-4">
          <Badge variant="secondary" className="mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Créateur de Services
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-4">
            Créer votre service
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Configurez votre service IA ou humain avec notre interface intuitive et moderne
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4 pb-12">
          {
            debugMessage
            && (
              <Card className="mb-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CardContent className="p-4">
                  <p className="text-green-800 dark:text-green-200 font-medium">{debugMessage}</p>
                </CardContent>
              </Card>
            )
          }

          <Card className="bg-background/80 backdrop-blur-xl shadow-2xl">
            <CardContent className="p-8">
              <div className="space-y-4 mb-8">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Type de service
                </Label>
                <RadioGroup
                  value={serviceType}
                  onValueChange={handleTypeChange}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="relative">
                    <RadioGroupItem value="ai" id="ai" className="sr-only" />
                    <Label
                      htmlFor="ai"
                      className={`block p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        serviceType === "ai"
                          ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                          : "border-muted bg-muted/30 hover:border-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg ${
                          serviceType === "ai" ? "bg-primary/20" : "bg-muted"
                        }`}
                        >
                          <Bot className={`w-5 h-5 ${
                            serviceType === "ai" ? "text-primary" : "text-muted-foreground"
                          }`}
                          />
                        </div>
                        <h3 className="font-semibold text-foreground">Service IA</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Automatisé et intelligent, parfait pour les tâches répétitives
                      </p>
                    </Label>
                  </div>

                  <div className="relative">
                    <RadioGroupItem value="human" id="human" className="sr-only" />
                    <Label
                      htmlFor="human"
                      className={`block p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        serviceType === "human"
                          ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                          : "border-muted bg-muted/30 hover:border-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg ${
                          serviceType === "human" ? "bg-primary/20" : "bg-muted"
                        }`}
                        >
                          <User className={`w-5 h-5 ${
                            serviceType === "human" ? "text-primary" : "text-muted-foreground"
                          }`}
                          />
                        </div>
                        <h3 className="font-semibold text-foreground">Service Humain</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Expertise humaine pour des tâches complexes et créatives
                      </p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {serviceType === "ai" && (
                <Form {...formIaService}>
                  <form onSubmit={formIaService.handleSubmit(onSubmitIaService, onError)} className="space-y-8">
                    <CommonFieldsIa form={formIaService} />

                    <Card className="bg-muted/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Bot className="w-5 h-5 text-primary" />
                          Configuration Agent IA
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={formIaService.control}
                            name="endpointUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Endpoint URL</FormLabel>
                                <FormControl>
                                  <Input
                                    type="url"
                                    placeholder="https://api.example.com/agent"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={formIaService.control}
                            name="modelName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nom du modèle</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Arthus"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={formIaService.control}
                            name="token"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Token</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Token d'authentification"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <Card className="bg-muted/30 backdrop-blur-sm">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-primary/20">
                                <FileText className="w-5 h-5 text-primary" />
                              </div>
                              Configuration JSON
                            </CardTitle>
                            <CardDescription>
                              Définissez la structure des données d'entrée
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="bg-background/60 rounded-lg border border-muted/40 overflow-hidden">
                              <JsonEditor
                                onSendData={handleJsonEditorData}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      </CardContent>
                    </Card>

                    <div className="pt-6">
                      <Button
                        type="submit"
                        className="w-full py-4 text-lg font-semibold transform hover:scale-[1.02] transition-all duration-300"
                        size="lg"
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Créer le service IA
                      </Button>
                    </div>
                  </form>
                </Form>
              )}

              {serviceType === "human" && (
                <Form {...formHumanService}>
                  <form onSubmit={formHumanService.handleSubmit(onSubmitHumanService, onError)} className="space-y-8">
                    <CommonFieldsHuman form={formHumanService} />

                    <Card className="bg-muted/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <User className="w-5 h-5 text-primary" />
                          Service Humain
                        </CardTitle>
                        <CardDescription>
                          Ce service sera exécuté par un expert humain
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground space-y-2">
                          <p>• Traitement personnalisé et adaptatif</p>
                          <p>• Expertise humaine pour des tâches complexes</p>
                          <p>• Temps de réponse variable selon la complexité</p>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="pt-6">
                      <Button
                        type="submit"
                        className="w-full py-4 text-lg font-semibold transform hover:scale-[1.02] transition-all duration-300"
                        size="lg"
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Créer le service humain
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
