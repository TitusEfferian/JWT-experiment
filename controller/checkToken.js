export const checkToken = (req,res,next) => {
    const header = req.headers['authorization']

    if(typeof header !== 'undefined'){
        const token = header
        req.token = token
        next()
    }
    else{
        res.sendStatus(403)
    }
}