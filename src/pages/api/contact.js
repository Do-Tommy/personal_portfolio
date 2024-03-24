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
        res.json({error:['unable to send mail']})
        return
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
        return false   
    }
    

}


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
        text: messageData.message,
      };
      
      try  {
        await transporter.sendMail({
        ...mailOptions
      });
      
      return info

      }catch(error) {
        return error
      }
       
    
}