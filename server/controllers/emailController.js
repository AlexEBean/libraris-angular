const nodeOutlook = require('nodejs-nodemailer-outlook')

module.exports = {

    email: async (req, res) => {

        const {email, subject, text} = req.body

        nodeOutlook.sendEmail({
            auth: {
                user: "writers-block-heroes@outlook.com",
                pass: "WB9Password!"
            },
            from: 'writers-block-heroes@outlook.com',
            to: email,
            subject: subject,
            html: `<p>${text}</p>`,
            text: text,
            replyTo: email,

            onError: (e) => console.log(e),
            onSuccess: (i) => console.log(i)
        }
        
        
        )
    }
}