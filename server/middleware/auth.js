// const jwt=require('jsonwebtoken');

// module.exports=async(req,res,next)=>{
//     const tokenAuth=req.headers.authorization;
//     console.log(tokenAuth);

//     try{
//         if(tokenAuth){
//             const token=tokenAuth.split(' ')[1];
//             console.log(token);
//             if (token){
//                 const userData=jwt.verify(token,'app');
//                 req.userId=userData.userId;
//                 next();
//             }else{
//                 throw new Error('No token provided');


//                 next();
//             }
//         }else{
//                 throw new Error('No authorization header');


//             next();
//         }
        
//     }catch(error){
//         console.error('Authentication error:', error);
//         req.userId=null;
//         next();
//     }
// }

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const tokenAuth = req.headers.authorization;
    if (tokenAuth) {
        const token = tokenAuth.split(' ')[1];
        if (token) {
            try {
                const userData = jwt.verify(token, 'app');
                req.userId = userData.userId;
                next();
            } catch (e) {
                req.userId = null;
                res.status(401).send('Invalid Token');
            }
        } else {
            req.userId = null;
            res.status(401).send('Token Missing');
        }
    } else {
        req.userId = null;
        res.status(401).send('No Authorization Header');
    }
};
