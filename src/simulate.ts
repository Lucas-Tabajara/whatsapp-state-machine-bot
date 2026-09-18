import { processMessage } from './processor.js';
import { Message } from 'whatsapp-web.js';

// Objeto simulado idêntico ao que o whatsapp-web.js injeta
const mockMessage = {
    from: '351999999999@c.us',
    body: 'Olá',
    getChat: async () => ({
        sendStateTyping: async () => console.log('Simulação: a digitar...')
    }),
    reply: async (text: string) => {
        console.log(`🤖 [BOT RESPONDEU]: ${text}`);
    }
} as unknown as Message;

// Executa o motor com o input simulado
async function runTest() {
    console.log('--- A simular "Olá" ---');
    await processMessage(mockMessage);

    // Simula a resposta com o nome
    const mockMessage2 = { ...mockMessage, body: 'Lucas' } as unknown as Message;
    console.log('--- A simular "Lucas" ---');
    await processMessage(mockMessage2);
}

runTest();