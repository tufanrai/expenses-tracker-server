import { IPayload } from "./global.types"

declare global { // node js stores its' packages inside the global
    namespace Express { // accessing the express folder 
        interface Request { // updating request inside the express
            user: IPayload
        }
    }
}