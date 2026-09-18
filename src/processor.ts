// src/processor.ts
import { Message } from 'whatsapp-web.js';
import { getUserSession, updateUserSession } from './state.js';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function processMessage(message: Message): Promise<void> {
    const phoneId = message.from;
    const text = message.body.trim();
    
    // Logs de observabilidade em tempo real
    console.log(`🔍 [DEBUG] Recebido de ${phoneId}: "${text}"`);

    // Filtro de segurança: Ignora grupos e mensagens do sistema
    if (phoneId.includes('@g.us') || phoneId === 'status@broadcast') return;

    const session = getUserSession(phoneId);

    // UX defensiva: Tenta simular digitação sem quebrar se a API falhar/ausentar
    try {
        const chat = await message.getChat();
        if (chat && typeof chat.sendStateTyping === 'function') {
            await chat.sendStateTyping();
        }
    } catch {
        // Ignora falhas de presença/digitação para preservar o fluxo principal
    }

    await delay(1500 + Math.random() * 1000); // Delay dinâmico humanizado

    try {
        switch (session.state) {
            case 'INICIO':
                await message.reply("Olá! Sou o assistente virtual. Como te posso chamar?");
                updateUserSession(phoneId, { state: 'AGUARDANDO_NOME' });
                break;

            case 'AGUARDANDO_NOME':
                updateUserSession(phoneId, { name: text, state: 'MENU_PRINCIPAL' });
                await message.reply(`Prazer, ${text}! \n\n1️⃣ - Suporte Técnico\n2️⃣ - Falar com Humano\n3️⃣ - Encerrar`);
                break;

            case 'MENU_PRINCIPAL':
                if (text === '1') {
                    await message.reply("O sistema opera normalmente. Mais alguma coisa? (3 para encerrar)");
                } else if (text === '2') {
                    await message.reply("A transferir para um humano... Aguarda, por favor.");
                    updateUserSession(phoneId, { state: 'FALANDO_ATENDENTE' });
                } else if (text === '3') {
                    await message.reply("Sessão encerrada.");
                    updateUserSession(phoneId, { state: 'INICIO' });
                } else {
                    await message.reply("Opção inválida. Digita 1, 2 ou 3.");
                }
                break;

            case 'FALANDO_ATENDENTE':
                if (text.toLowerCase() === 'sair') {
                    await message.reply("Atendimento humano encerrado.");
                    updateUserSession(phoneId, { state: 'INICIO' });
                }
                break;
        }
    } catch (error) {
        console.error(`Erro crítico no switch de ${phoneId}:`, error);
        await message.reply("Ocorreu um erro interno. Tenta novamente mais tarde.");
    }
}