module.exports = {
    getHolds: async (req, res) => {
        const db = req.app.get('db')
        const allHolds = await db.hold.get_all_holds()
        res.status(200).send(allHolds)
    },

    getHold: async (req, res) => {
        const db = req.app.get('db')
        const {userId} = req.params

        try {
            const hold = await db.hold.get_user_holds(+userId)
            res.status(200).send(hold)
        } catch(err) {
            console.log("Error in displaying user's holds", err)
            res.sendStatus(404)
        }
    },

    addHold: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const {bookId} = req.params
  
        try {
            const checkHold = (await db.hold.check_hold([+user_id, +bookId]))[0].case
            if (checkHold === "FALSE"){
                await db.hold.add_hold([+user_id, +bookId])
                res.sendStatus(200)
            } else {
                return res.status(409).send("You already have a hold on that book")
            }
        } catch(err) {
            console.log("Error in adding hold", err)
            res.sendStatus(404)
        }
    },

    deleteHold: async (req, res) => {
        const db = req.app.get('db')
        const {holdId} = req.params

        try {
            await db.hold.delete_hold([+holdId])
            res.sendStatus(200)
        } catch(err) {
            console.log("Error in deleting hold", err)
            res.sendStatus(500)
        }
      }
}