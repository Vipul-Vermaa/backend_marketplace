import { catchAsyncError } from '../middlewares/catchAsyncError.js'
import ErrorHandler from '../utils/errorHandler.js'
import { Inventory } from '../models/Inventory.js'
import cloudinary from 'cloudinary'
import getDataUri from '../utils/dataUri.js'

export const createInventory = catchAsyncError(async (req, res, next) => {
    const { title, description, createdBy } = req.body
    if (!title || !description || !createdBy) return next(new ErrorHandler('Enter all fields', 400))
    const file = req.file
    const fileUri = getDataUri(file)
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content, {resource_type: 'auto'})
    const inventory = await Inventory.create({
        title,
        description,
        createdBy,
        inventoryItem: {
            type: file.mimetype.split('/')[0],
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
        }
    })
    res.status(201).json({
        success: true,
        message: 'Inventory item created successfully',
        inventory,
    });
})

export const deleteInventory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const inventory = await Inventory.findById(id)
    if (!inventory) return next(new ErrorHandler('Not Found', 404))
    await inventory.remove()
    res.status().json({
        success: true,
        message: 'Deleted'
    })
})

export const getAllInventory = catchAsyncError(async (req, res, next) => {
    const inventory = await Inventory.find().sort({createdAt: -1})
    res.status(200).json({
        success: true,
        inventory
    })
})

export const getInventoryItems = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    const items = await Inventory.findById(id)
    if (!items) return next(new ErrorHandler('Not found', 404))
    await items.save()
    res.status(200).json({
        success: true,
        Inventory: items.inventory
    })
})

