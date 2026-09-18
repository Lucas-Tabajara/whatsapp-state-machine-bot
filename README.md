# 🤖 State-Driven WhatsApp Automation Engine

Um motor de atendimento conversacional modular construído em **TypeScript**, desenhado com o padrão de Máquina de Estados (Finite State Machine) para garantir isolamento de regras de negócio e testabilidade.

## 🧠 Foco da Arquitetura
Este projeto afasta-se dos scripts sequenciais comuns para focar em engenharia de software sustentável:
- **Desacoplamento:** A regra de negócio (`state.ts`) não sabe que o WhatsApp existe.
- **Fail-open UX:** Tratamento de erros isolado em blocos try/catch para efeitos visuais (como simulação de digitação), garantindo que falhas de rede não quebram o funil principal.
- **Testabilidade:** Configurado para testes unitários com `vitest` para validar as transições de estado.

## 🛠️ Stack Tecnológica
- **TypeScript** (Tipagem estrita e Node ESM)
- **whatsapp-web.js** + **Puppeteer**
- **Vitest** (Testes unitários isolados)

## 🚀 Como Executar Localmente
1. Clone o repositório.
2. Instale as dependências: `npm install`
3. Execute os testes lógicos: `npm test`
4. Inicie o motor: `npm run start` (ou `npx tsx src/index.ts`)
5. Leia o QR Code gerado no terminal com o seu WhatsApp.