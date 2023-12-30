import admin from 'firebase-admin'

export default async (req, res, next) => {

  try {
    const authHeader = req.get('x-fb-key');

    if (!authHeader) {
      res.status(401);
      return;
    }
  
    // if authHeader is present, then we can validate the user against his present jwt token for authentication.
    const token = authHeader.replace(/[^a-zA-Z0-9_+.\-]/g, '');
    const response = await admin.auth().verifyIdToken(token)    
    req.uid = response.uid
    
    next()
  } catch(e) {
    next(e)
  }
}