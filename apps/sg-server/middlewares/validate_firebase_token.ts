import admin from 'firebase-admin'

export default async (req, res, next) => {

  try {

    const bypassAuth = process.env.BYPASS_AUTH_KEY 

    if(req.get('x-bypass-auth') && req.get('x-bypass-auth') === bypassAuth) {
      next()
      return;
    }

    const authHeader = req.get('x-fb-key');

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token not provided'
      });
    }
  
    const token = authHeader.replace(/[^a-zA-Z0-9_+.\-]/g, '');

    try {
      const response = await admin.auth().verifyIdToken(token)    
      req.uid = response.uid
      next()
    } catch (e: any) {

      if(e.code === 'auth/id-token-expired') {
        return res.status(401).json({
          success: false,
          message: 'Token expired'
        })
      }
    }

  } catch(e) {
    next(e)
  }
}