const nodemailer = require('nodemailer')
const {google} = require('googleapis')

const CLIENT_ID = '263925228951-1okltfh1ld0kti9be52859h420j2p82i.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04IMSep-aiVndCgYIARAAGAQSNwF-L9IrOXtzg-rf-Eir_S6AK_SYSNq6W7puxPKeydvlVLJsxv5MLsLd0fzm2zrVXzJgCYD5P1M'

const oAuth2client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI )
oAuth2client.setCredentials({ refresh_token: REFRESH_TOKEN })

async function sendMail(){

    try {
        const acessToken = await oAuth2client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type : 'OAuth2',
                user : 'ashuc306@gmail.com',
                clientId : CLIENT_ID,
                clientSecret : CLIENT_SECRET,
                refreshToken : REFRESH_TOKEN,
                acessToken : acessToken
            }  
        }) 
        
        const mailOPtions = {
            from : 'ASHU<ashuc306@gmail.com> ',
            to : 'ashuc306@gmail.com',
            subject : 'HELLO from gmail email using API',
            text : 'HELLO from gmail email using API',
            html : '<h1>Hello from gmail email using API</h1>',
           };

           const result = await transport.sendMail(mailOPtions);
           return result;
    }catch(error){
        return error;
    }
}

sendMail().then((result)=> console.log('Email sent......',result)).catch((error)=> console.log("This is the error",error.message));