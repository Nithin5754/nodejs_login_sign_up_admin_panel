
const authencation=(req,res,next)=>{
    if(req.session.data){
      next()
    }else{
      res.redirect('/login')
    }
}

module.exports=authencation