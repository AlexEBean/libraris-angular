const bcrypt = require("bcrypt")

module.exports = {

    register: async (req, res) => {
        const db = req.app.get('db')
        const {firstName, lastName, email, password} = req.body
        const existingUser = await db.auth.check_user(email)
        if (existingUser[0]) {
          return res.status(409).send("User already exists with that email")
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const [newUser] = await db.auth.add_user([firstName, lastName, email, hash])

        req.session.user = newUser

        res.status(200).send(req.session.user)
    },

    login: async (req, res) => {
        const db = req.app.get('db')
        const {email, password} = req.body
        const [foundUser] = await db.auth.check_user(email)
        if(!foundUser){
            return res.status(401).send("Incorrect login information")
        }
        const authenticated = bcrypt.compareSync(password, foundUser.password)
        if( authenticated ){
            req.session.user = foundUser
            res.status(200).send(req.session.user)
        } else {
            res.status(401).send('Incorrect login information')
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },

    refresh: async (req, res) => {
        if (req.session.user){
           try{
                const {user_id} = req.session.user    
                const db = req.app.get('db')
                const [user] = await db.auth.refresh_user(+user_id)
                res.status(200).send(user)
           }  catch(err) {
                console.log("Error in refreshing", err)
                res.sendStatus(500)
            }
        }  else {
            res.sendStatus(200)
        }
    },
    addView: async (req, res) => {
        const db = req.app.get('db')
        const {page} = req.body
        await db.auth.add_view(page)
        const [viewTotal] = await db.auth.get_view_count(page)
        res.status(200).send(viewTotal)
    }
}