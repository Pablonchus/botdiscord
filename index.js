const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');

// Configuración del cliente de Discord con los intents necesarios
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// Token de autenticación del bot
const token = 'MTM1NTUyMDMyMzUxMjE3MjY1NA.Gt_oYB.2mu1pwNPF96qfjEoStd8pVpTY4s9o8ovVRAcNo';

// ID del canal donde se enviarán los mensajes
const canalID = '1355523915279110277';

// Evento que se ejecuta cuando el bot está listo
client.once('ready', () => {
    console.log(`Conectado como ${client.user.tag}`);

    // Obtener el canal por su ID
    const canal = client.channels.cache.get(canalID);
    if (!canal) {
        console.error('Canal no encontrado');
        return;
    }

    // Definir los horarios en los que se enviarán los mensajes (7:55, 15:55 y 23:55)
    const horarios = ['55 7 * * *', '55 15 * * *', '55 23 * * *'];

    // Programar el envío de mensajes en los horarios especificados
    horarios.forEach(horario => {
        cron.schedule(horario, () => {
            canal.send({
                content: '@everyone El servidor va a reiniciar en 5 minutos',
                allowedMentions: { parse: ['everyone'] }
            }).catch(console.error);
        }, {
            timezone: 'Europe/Madrid'
        });
    });

    console.log('Tareas programadas configuradas.');
});

// Iniciar sesión del bot con el token proporcionado
client.login(token);
