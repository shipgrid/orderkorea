
import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  getVehicles,
  getVehicleById,
  createVehicle,
  deleteVehicle,
  updateVehicle
} from '../services/vehicles.service'

const getVehiclesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const vehicles = await getVehicles({})

    res.status(200).json({ data: vehicles, success: true });
  } catch (e) {
    next(e)
  }
}

const createVehicleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const {
      make,
      model,
      year,
      exterior_color,
      transmission_type,
      mileage,
      description
    } = req.body

    const data = await createVehicle({
      make,
      model,
      year,
      exterior_color,
      transmission_type,
      mileage,
      description
    })

    res.status(200).json({ data: data, success: true });
  } catch (e) {
    next(e)
  }
}

const deleteVehicleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const {
      vehicle_id
    } = req.params

    await deleteVehicle({
      vehicle_id
    })

    res.status(200).json({ success: true });
  } catch (e) {
    next(e)
  }
}

const updateVehicleController = async (  
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const {
      vehicle_id,
      make,
      model,
      year,
      exterior_color,
      transmission_type,
      mileage,
      description
    } = req.body

    await updateVehicle({
      vehicle_id,
      make,
      model,
      year,
      exterior_color,
      transmission_type,
      mileage,
      description
    })

    res.status(200).json({ success: true });
  } catch (e) {
    next(e)
  }
}

const getVehicleByIdController = async (  
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const {
      vehicle_id,
    } = req.params
  
    const data = await getVehicleById({
      vehicle_id,
    })
  
    res.status(200).json({ data, success: true });
  } catch (e) {
    next(e)
  }
}

export {
  getVehicleByIdController,
  getVehiclesController,
  createVehicleController,
  deleteVehicleController,
  updateVehicleController
}