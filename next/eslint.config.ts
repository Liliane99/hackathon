import path from "path";
import { fileURLToPath } from "url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  // Configuration de base JavaScript
  js.configs.recommended,

  // Configurations Next.js et React
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
  ),

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // === RÈGLES DE FORMATAGE AUTO-CORRECTIVES ===

      // Indentation (2 espaces)
      "indent": ["error", 2, {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        MemberExpression: 1,
        FunctionDeclaration: { parameters: 1, body: 1 },
        FunctionExpression: { parameters: 1, body: 1 },
        CallExpression: { arguments: 1 },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        ignoreComments: false,
      }],

      // Guillemets simples
      "quotes": ["error", "double", {
        avoidEscape: true,
        allowTemplateLiterals: true,
      }],

      // Guillemets simples pour JSX
      "jsx-quotes": ["error", "prefer-double"],

      // Point-virgules obligatoires
      "semi": ["error", "always"],

      // Suppression des espaces en fin de ligne
      "no-trailing-spaces": "error",

      // Maximum 1 ligne vide
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0, maxBOF: 0 }],

      // Nouvelle ligne en fin de fichier
      "eol-last": ["error", "always"],

      // Virgules finales sur les objets/tableaux multi-lignes
      "comma-dangle": ["error", "always-multiline"],

      // Espaces après les virgules
      "comma-spacing": ["error", { before: false, after: true }],

      // Espaces dans les objets { key: value }
      "object-curly-spacing": ["error", "always"],

      // Pas d'espaces dans les tableaux [1, 2, 3]
      "array-bracket-spacing": ["error", "never"],

      // Espaces avant les parenthèses des fonctions
      "space-before-function-paren": ["error", {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      }],

      // Espaces autour des opérateurs
      "space-infix-ops": "error",

      // Espaces pour les opérateurs unaires
      "space-unary-ops": ["error", { words: true, nonwords: false }],

      // Espaces avant/après les mots-clés
      "keyword-spacing": ["error", { before: true, after: true }],

      // Espaces dans les blocs
      "space-before-blocks": "error",

      // Espaces dans les parenthèses
      "space-in-parens": ["error", "never"],

      // Espaces dans les crochets
      "computed-property-spacing": ["error", "never"],

      // Espaces autour des deux-points
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],

      // Style des accolades
      "brace-style": ["error", "1tbs", { allowSingleLine: true }],

      // === RÈGLES DE QUALITÉ DE CODE ===

      // Console uniquement en développement
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",

      // Variables non utilisées
      "no-unused-vars": ["error", {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: true,
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      }],

      // Éviter les variables undefined
      "no-undef": "error",

      // === RÈGLES REACT ===

      // React hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // React moderne (pas besoin d'importer React)
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",

      // JSX
      "react/jsx-props-no-spreading": "off",
      "react/jsx-filename-extension": ["warn", { extensions: [".jsx", ".tsx"] }],
      "react/prop-types": "off", // On utilise TypeScript

      // === RÈGLES NEXT.JS ===

      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "warn",

      // === RÈGLES D'IMPORT ===

      "import/prefer-default-export": "off",
      "import/no-unresolved": "off", // TypeScript gère cela
      "import/order": ["error", {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "never",
      }],
    },
  },

  // Ignorer certains fichiers
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "dist/**",
      "build/**",
    ],
  },
] as const;
