import logger from '../models/logger'
import {
  createUserCustomer
} from './user.service'

import {
  convertToLocalDateString
} from '../utils/dates'

import bcrypt from 'bcryptjs'

interface IRegisterUser {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}

const register = async ({
  first_name,
  last_name,
  username,
  password
}: IRegisterUser) => {

  try {

    let password_hash = await bcrypt.hash(password, 10);

    if(!password_hash) {
      throw new Error('Error hashing password');
    }

    const user = await createUserCustomer({
      first_name,
      last_name,
      username,
      password_hash: password_hash,
      last_login: convertToLocalDateString(new Date()),
    })

    logger.info('User added successfully', user);

  } catch(e) {
    logger.error('Error registering user:', e);
    throw e
  }
}

export {
  register
}