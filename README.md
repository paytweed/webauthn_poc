## Setup

1. Run `npm install`
2. Fill the following params in the .env file:

> PORT=5133  
> NGROK_TOKEN="your ngrok token"  
> NGROK_DOMAIN=webauthn-poc-nflh75230vwds.ngrok.app  

3. Run `npm run setup:ngrok` - Configures the ngrok with the token from the ENV
4. run `npm run dev` - Starts a local server
5. run `npm run serve` - Connects the locally running server to ngrok
