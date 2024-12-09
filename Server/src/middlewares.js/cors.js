function setCors(){
    return function(req,res,next){
        res.setHeader("Access-Control-Allow-Origin", "https://softuni-angularjs-final-project.onrender.com");
        res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, DELETE, POST");
        res.setHeader("Access-Control-Allow-Headers", "Content-type, X-Authorization");
        res.setHeader("Access-Control-Allow-Credentials",true);
        next();
    }
}

module.exports={
    setCors
}