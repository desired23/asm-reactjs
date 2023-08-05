import { IRegistrationData } from "../interfaces/user"
import instance from "./instance"

const signin = (data: IRegistrationData) => {

    return instance.post('/auth/signin', data)
}
const signup = (data: IRegistrationData) => {
    return instance.post('/auth/signup', data)
}


export { signup, signin }

