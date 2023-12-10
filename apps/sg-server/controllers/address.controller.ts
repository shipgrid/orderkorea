import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  getAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress
} from '../services/address.service'


const getAddressesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const data = await getAddresses({})

    res.status(200).json({ data: data, success: true });
  } catch (e) {
    next(e)
  }
}

const getAddressByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const {
      address_id
    } = req.params

    const data = await getAddressById({
      address_id
    })

    res.status(200).json({ data: data, success: true });
  } catch (e) {
    next(e)
  }
}

const createAddressController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const {
      name,
      line1,
      line2,
      city,
      state_code,
      country_code,
      postal_code,
      email,
      phone,
      customer_id,
    } = req.body

    const data = await createAddress({
      name,
      line1,
      line2,
      city,
      state_code,
      country_code,
      postal_code,
      email,
      phone,
      customer_id,
    })

    res.status(200).json({ data: data, success: true });
  } catch (e) {
    next(e)
  }
}

const updateAddressController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const {
      address_id,
      name,
      line1,
      line2,
      city,
      state_code,
      country_code,
      postal_code,
      email,
      phone,
      customer_id,
    } = req.body

    const data = await updateAddress({
      address_id,
      name,
      line1,
      line2,
      city,
      state_code,
      country_code,
      postal_code,
      email,
      phone,
      customer_id,
    })

    res.status(200).json({ data: data, success: true });
  } catch (e) {
    next(e)
  }
}

const deleteAddressController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const {
      address_id
    } = req.body

    const data = await deleteAddress({
      address_id
    })

    res.status(200).json({ data: data, success: true });
  } catch (e) {
    next(e)
  }
}

export {
  getAddressesController,
  createAddressController,
  updateAddressController,
  deleteAddressController,
  getAddressByIdController
}