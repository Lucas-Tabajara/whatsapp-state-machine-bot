import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { processMessage } from './processor.js';

const client = new Client({
    authStrategy: new LocalAuth({ dataPath: './.wwebjs_auth' }),
    puppeteer: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote'
        ],
    }
});

client.on('qr', (qr: string) => {
    console.log('📌 Escaneia o QR Code abaixo com o WhatsApp:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Cliente conectado e a escutar mensagens!');
});

client.on('message', async (message) => {
    // Processamento assíncrono para não bloquear o event loop
    processMessage(message).catch(err => {
        console.error('Falha crítica na orquestração:', err);
    });
});

client.initialize();