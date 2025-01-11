class ApiError extends error{
    constructor(
        statusCode,
        message= "somthing went wrong",
        errors=[],
        stack= ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message=message
        this.success = false
        this.errors = errors
        if(stack){
            this.stack= stack
        }else{
            Error.captureStackTrace(this, this.
                constructor)
        }
    }
}

//the above code make a generalize format for throwing error
//this format will be used in whole project so that it does
//creates confusion

export {ApiError}