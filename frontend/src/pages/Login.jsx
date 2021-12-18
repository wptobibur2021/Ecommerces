import styled from "styled-components";
import {mobile} from "../responsive";
import {useState} from "react";
import useAPI from "../Hooks/useAPI";
import {useDispatch, useSelector} from "react-redux";
import useNotification from "../Hooks/useNotification";
import {useNavigate} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const {errorNotify, successNotify} = useNotification()
  const {isFetching, error} = useSelector((state) => state.user)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {loginAPI} = useAPI()
  const loginHandle = (e)=>{
    e.preventDefault()
    const userInfo = {
      username: username,
      password: password
    }
    loginAPI(dispatch,userInfo, errorNotify, successNotify, navigate)
  }
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={loginHandle}>
          <Input required={true} type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
          <Input required={true} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
          <Button>{isFetching ? <CircularProgress color="white" size= "22px" /> : 'LOGIN'}</Button>
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
