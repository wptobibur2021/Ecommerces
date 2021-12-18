import {loginFailure, loginStart, loginSuccess} from "../Redux/userRedux";
import {publicRequest} from "./useRequestMethods";


const useAPI = ()=>{
    // Login API Methods Declaration Below
    const loginAPI = async (dispatch, userInfo, errorNotify, successNotify, navigate) =>{
        dispatch(loginStart());
        try{
            await publicRequest.post('/auth/login', userInfo).then(res=>{
                console.log(res)
                if(res.data){
                    dispatch(loginSuccess(res.data))
                    successNotify("User Login SuccessFully")
                    navigate('/')
                }
            })
        }catch (e) {
            dispatch(loginFailure())
            //console.log()
            errorNotify(e.response.data)
            //navigate('/registration')
        }
    }
    return {loginAPI}
}
export default useAPI

