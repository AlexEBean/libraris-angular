
module.exports = {
    getUser: (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.status(404).send('Please log in')
        }
    },
    
    getUsers: async (req, res) => {
        const db = req.app.get("db")
        const allUsers = await db.user.get_users()
        res.status(200).send(allUsers)
    },

    updateUser: async (req, res) => {
        const db = req.app.get("db")
        const {userId} = req.params
        await db.user.update_user_admin_status(+userId)
        
        res.sendStatus(200)
    },
    deleteUser: async (req, res) => {
        const db = req.app.get('db')
        const {userId} = req.params

        try {
            await db.user.remove_user([+userId])
            res.sendStatus(200)
        } catch(err) {
            console.log("Error in removing User", err)
            res.sendStatus(500)
        }
      }
}