function setCors(){
    const allowerOrigins=["http://localhost:4200","https://softuni-angularjs-final-project.onrender.com"]
    return function(req,res,next){
        const origin=req.headers.origin;
        if(allowerOrigins.includes(origin)){
            res.setHeader("Access-Control-Allow-Origin", origin);
        }
        res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, DELETE, POST");
        res.setHeader("Access-Control-Allow-Headers", "Content-type, X-Authorization");
        res.setHeader("Access-Control-Allow-Credentials",true);
        next();
    }
}

module.exports={
    setCors
}