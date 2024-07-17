import express from 'express'
import singleUpload from '../middlewares/multer.js'
import {isAuthenticated,isSubscribed} from '../middlewares/auth.js'
import { createInventory, deleteInventory, getAllInventory, getInventoryItems } from '../controllers/inventoryController.js'

const router=express.Router()

router.route('/createinventory').post(isAuthenticated,isSubscribed,singleUpload,createInventory)

router.route('/inventory/:id').get(isAuthenticated,getInventoryItems)

router.route('/inventory').get(isAuthenticated,getAllInventory)

export default router