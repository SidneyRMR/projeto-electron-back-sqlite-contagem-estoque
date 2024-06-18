const ngrok = require('ngrok');
const fs = require('fs');
const path = require('path');

(async function() {
  try {
    const url = await ngrok.connect(3000); // Porta do seu servidor local
    console.log(`Ngrok URL: ${url}`);

    // Escreva o URL do Ngrok no arquivo .env
    fs.writeFileSync(path.join(__dirname, '.env'), `REACT_APP_NGROK_URL=${url}\n`, { encoding: 'utf8', flag: 'w' });

    process.exit(0);
  } catch (error) {
    console.error('Erro ao conectar com o Ngrok:', error);
    process.exit(1);
  }
})();
