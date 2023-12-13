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

    console.log('hit register11', { first_name, last_name, username, password })
    let password_hash = await bcrypt.hash(password, 10);

    console.log('b')
    if(!password_hash) {
      throw new Error('Error hashing password');
    }

    console.log('c')

    const user = await createUserCustomer({
      first_name,
      last_name,
      username,
      password_hash: password_hash,
      last_login: convertToLocalDateString(new Date()),
    })

    console.log('d!', user)

    logger.info('User added successfully', user);

  } catch(e) {
    console.log('err: ', e)
    logger.error('Error registering user:', e);
    throw e
  }
}

export {
  register
}