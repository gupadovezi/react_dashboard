<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/793b6c0a-44b5-4dbc-91f5-7f0a0ed9b538

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
   
Após isso, abra o navegador em:

http://localhost:5173

💡 A porta pode variar dependendo da sua configuração do Vite.

🗂 Estrutura do Projeto
react_dashboard/
├── src/                 # Código‑fonte front‑end
├── public/              # Arquivos públicos
├── .env.example         # Variáveis de ambiente exemplo
├── vite.config.ts       # Configuração do Vite
├── package.json         # Pacotes e scripts
└── README.md            # Esta documentação
