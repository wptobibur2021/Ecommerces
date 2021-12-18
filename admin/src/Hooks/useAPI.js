import {loginFailure, loginStart, loginSuccess} from "../Redux/userRedux";
import {deleteProductStart, deleteProductSuccess, deleteProductFailure, getProductStart, getProductSuccess, getProductFailure} from "../Redux/productRedux";
import {publicRequest, userRequest} from "./useRequestMethods";



const useAPI = ()=>{
    // Login API Methods Declaration Below
    const loginAPI = async (dispatch, userInfo, errorNotify, successNotify, history) =>{
        dispatch(loginStart());
        try{
            await publicRequest.post('/auth/login', userInfo).then(res=>{
                console.log(res)
                if(res.data){
                    dispatch(loginSuccess(res.data))
                    successNotify("User Login SuccessFully")
                    history.push('/')
                }
            })
        }catch (e) {
            dispatch(loginFailure())
            //console.log()
            errorNotify(e)
            //navigate('/registration')
        }
    }
    // GET ALL PRODUCT
    const getProducts = async (dispatch) =>{
        dispatch(getProductStart())
        try{
            await userRequest.get('/product/all').then(res=>{
                dispatch(getProductSuccess(res.data))
            })
        }catch(e){
            dispatch(getProductFailure())
        }
    }
    // DELETE PRODUCT
    const deleteProduct = async (id,dispatch)=>{
        dispatch(deleteProductStart())
        try{
            // await userRequest.delete(`/product/delete/${id}`).then(res=>{
            //     dispatch(deleteProductSuccess())
            // })
            dispatch(deleteProductSuccess(id))
        }catch (e) {
            dispatch(deleteProductFailure())
        }
    }
    return {loginAPI, getProducts, deleteProduct}
}
export default useAPI

