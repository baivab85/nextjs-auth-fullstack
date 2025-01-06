import User from "@/models/userModel";
import nodemailer from "nodemailer"
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email,emailType,userId}:any)=>{
    try {
      
      const hashedToken =  await bcryptjs.hash(userId.toString(),10)

      if(emailType=="VERIFY"){
        await User.findByIdAndUpdate(userId,
          { $set:{
            verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000}
          }
        )
      }
      else if(emailType=="RESET"){
        await User.findByIdAndUpdate(userId,
          { $set:{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now()+3600000}}
        )
      }


        // Looking to send emails in production? Check out our Email API/SMTP product!
         var transport = nodemailer.createTransport({
         host: "sandbox.smtp.mailtrap.io",
         port: 2525,
         auth: {
           user: "07b62bcbf5b3b0",
           pass: "c8cb73cbac7dbc"
          }
         });

          const mailOptions = {
            from: 'shiladityamukherjee5486@gmail.com', // sender address
            to: email,
            subject: emailType==='VERIFY'?'VERIFY YOUR EMAIL':"Reset your password", 
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>
            to ${emailType==="VERIFY"?"verify your email":"rest your password"}
            or Copy or paste link in your browser
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
          }

          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse
    }
     catch (error:any) {
        throw new Error(error.message)
    }
}