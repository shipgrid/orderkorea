
// import { 
//   Request, 
//   Response, 
//   NextFunction 
// } from 'express'

// import {
//   createUserCustomer
// } from '../services/user.service'



// import logger from '../models/logger'

// const addUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {

//   try {

//     // const user = await UserCustomer.query().insert({
//       // first_name: 'joe',
//       // last_name: 'fong',
//       // username: 'joefong',
//       // password_hash: 'kjk1k2kj1l',
//       // last_login: convertToLocalDateString(new Date()),
//     // });

//     await createUserCustomer()

//     logger.info('User added successfully');

//     res.status(200).json({ message: 'User added successfully'});
//   } catch (e) {
//     next(e)
//   }
// }

// export {
//   addUser
// }