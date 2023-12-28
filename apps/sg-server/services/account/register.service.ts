import {
  Logger
} from '../../models'

import {
  customers
} from '../../services'

import {
  convertToLocalDateString
} from '../../utils/dates'

import bcrypt from 'bcryptjs'

interface IRegisterUser {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  uid: string;
}

export default async ({
  first_name,
  last_name,
  username,
  password,
  uid
}: IRegisterUser) => {

  try {

    let password_hash = await bcrypt.hash(password, 10);

    if(!password_hash) {
      throw new Error('Error hashing password');
    }

    const user = await customers.create({
      first_name,
      last_name,
      username,
      uid,
      password_hash: password_hash,
      last_login: convertToLocalDateString(new Date()),
    })

    Logger.info('User added successfully', user);

  } catch(e) {
    Logger.error('Error registering user:', e);
    throw e
  }
}
