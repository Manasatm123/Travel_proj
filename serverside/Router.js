import { Router } from "express"
// import Auth from './authentication/Auth.js'

import * as rh from './Requesthandler.js'

const router=Router()


router.route('/adduser').post(rh.addUser)
router.route('/login').post(rh.login)
router.route('/verifyEmail').post(rh.verifyEmail)
export default router