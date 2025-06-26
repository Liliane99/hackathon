'use client'

import React, { useState } from 'react'
import { FormField } from '../../../schemas/formBuilder'

interface DynamicFormProps {
  fields: FormField[]
  onSubmit: (data: Record<string, any>) => void
  submitLabel?: string
  className?: string
}

function isSelectField(field: FormField): field is Extract<FormField, { type: 'select' }> {
  return field.type === 'select'
}

export default function DynamicForm({ 
  fields, 
  onSubmit, 
  submitLabel = "Soumettre",
  className = ""
}: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    fields.forEach(field => {
      const value = formData[field.name]
      
      if (field.required && (!value || value === '')) {
        newErrors[field.name] = `${field.label} est requis`
        return
      }

      if (value && field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          newErrors[field.name] = 'Email invalide'
        }
      }

      if (value && field.type === 'number') {
        const numValue = Number(value)
        if (isNaN(numValue)) {
          newErrors[field.name] = 'Doit être un nombre'
        } else {
          if (field.min !== undefined && numValue < field.min) {
            newErrors[field.name] = `Doit être supérieur ou égal à ${field.min}`
          }
          if (field.max !== undefined && numValue > field.max) {
            newErrors[field.name] = `Doit être inférieur ou égal à ${field.max}`
          }
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const renderField = (field: FormField) => {
    const baseClasses = `
      w-full px-3 py-2 
      bg-input border border-border rounded-lg
      text-foreground placeholder:text-muted-foreground
      focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
      transition-colors duration-200
    `

    const errorClasses = errors[field.name] ? 'border-destructive focus:ring-destructive' : ''

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={`${baseClasses} ${errorClasses}`}
            placeholder={`Entrez ${field.label.toLowerCase()}`}
            required={field.required}
          />
        )

      case 'email':
        return (
          <input
            type="email"
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={`${baseClasses} ${errorClasses}`}
            placeholder="exemple@email.com"
            required={field.required}
          />
        )

      case 'number':
        return (
          <input
            type="number"
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            min={field.min}
            max={field.max}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={`${baseClasses} ${errorClasses}`}
            placeholder={`Entrez ${field.label.toLowerCase()}`}
            required={field.required}
          />
        )

      case 'select':
        if (!isSelectField(field)) return null
        return (
          <select
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={`${baseClasses} ${errorClasses} cursor-pointer`}
            required={field.required}
          >
            <option value="">Sélectionnez {field.label.toLowerCase()}</option>
            {field.options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )

      default:
        return null
    }
  }

  return (
    <div className={`max-w-md mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label 
              htmlFor={field.name}
              className="block text-sm font-medium text-foreground"
            >
              {field.label}
              {field.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </label>
            
            {renderField(field)}
            
            {errors[field.name] && (
              <p className="text-sm text-destructive mt-1">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="
            w-full px-4 py-2
            bg-primary text-primary-foreground
            hover:bg-primary/90
            focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
            rounded-lg font-medium
            transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {submitLabel}
        </button>
      </form>
    </div>
  )
}
