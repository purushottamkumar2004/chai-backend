//4 file
const asyncHandler =  (requestHandler) =>{
     return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).
        catch((err) => next(err))
    }
}

//whenever we will pass any function in asyncHandler that
//  function will automaticaly work in asynchronus way so
//we don't need to write the ashyncronus code again and
//again we will just pass a simple funcion in this asyncHandler 
export {asyncHandler}



