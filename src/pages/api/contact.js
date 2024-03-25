import { info } from 'autoprefixer';
import {object,string} from 'yup'
const nodemailer = require("nodemailer");

export const contactSchema = object({
    username: string().required().min(2).max(25),
    email: string().required().email(),
    message: string().required().min(3).max(125)

});

export default async function handler(req,res) {
    const formData = req.body;

    if (req.method!== 'POST') {
        res.status(405).send({message:'POST requests only'})
        return
    }
    
    const ishuman = validateCaptcha(formData.token);
    if(!ishuman){
        res.status(400)
        res.json({errors:['Not Human']})
        return
    }

    const validform = await validateContactForm(formData);
    
    if(!validform) {
        console.log('failed')
        res.status(400)
        res.json({error:['incorrect form']})
        return 
    }

    const messageData = {
        username: validform.username,
        email: validform.email,
        message: validform.message
    }

    const mailobject = await sendNodemailer(messageData);
    if(!mailobject) {
        res.status(400)
        return res.json({error:['unable to send mail']})
        
    }

    res.status(200).json({message:'Success'})
    

}

async function validateCaptcha(token) {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`)
    {
        method:'POST'
    }
    const data = await response.json();
    
    return data.success
}

async function validateContactForm(formValues) {
    
    try {
        const validForm = await contactSchema.validate(formValues, { stripUnknown: true });
        
        return validForm
        
    } catch (error) {

        return error   
    }
    

}

const CONTACT_MESSAGE_FIELDS = {
    username: "Username",
    email: "Email",
    subject: "Subject",
    message: "Message",
  };

const generateEmailContent = (data) => {
    const stringData = Object.entries(data).reduce(
      (str, [key, val]) =>
        (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
      ""
    );
    const htmlData = Object.entries(data).reduce((str, [key, val]) => {
      return (str += `<h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h3><p class="form-answer" align="left">${val}</p>`);
    }, "");
  
    return {
      text: stringData,
      html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2>New Contact Message</h2> <div class="form-container">${htmlData}</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`,
    };
  };

async function sendNodemailer(messageData) {
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    
    const mailOptions = {
        from: process.env.USER,
        to: process.env.USER,
        subject: `Message from ${messageData.username} (${messageData.email})`,
        ...generateEmailContent(messageData),

    };
      
      try  {
        await transporter.sendMail({
        ...mailOptions
      });
      
      

      }catch(error) {
        return error
      }
       
    return true
}