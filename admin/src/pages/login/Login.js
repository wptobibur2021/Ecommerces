import React, {useState} from 'react';
import {Box, Container, TextField, Button, Paper, Grid, FormControl} from "@material-ui/core";
import useNotification from "../../Hooks/useNotification";
import useAPI from "../../Hooks/useAPI";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom"

const Login = () => {
    const {errorNotify, successNotify} = useNotification()
    //const {isFetching, error} = useSelector((state) => state.user)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
    const dispatch = useDispatch()
    const {loginAPI} = useAPI()
    const loginHandle = (e) =>{
        e.preventDefault()
        const userInfo = {
            username: username,
            password: password
        }
        //console.log('UserInfo: ', userInfo)
        loginAPI(dispatch, userInfo, errorNotify, successNotify, history)
    }
    return (
        <Box>
            <Container>
                <Box sx={{ display: 'flex', py: 15, alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                    <Grid container>
                        <Grid sm={4} md={4} xs={12}></Grid>
                    <Grid sm={4} md={4} xs={12}>
                        <form onSubmit={loginHandle}>
                        <Paper elevation={3} style={{ padding: "30px"}} >
                            <FormControl fullWidth variant="standard">
                                <TextField
                                    id="email"
                                    label="Username"
                                    variant="standard"
                                    type="text"
                                    required
                                    multiline
                                    onChange={(e)=>setUsername(e.target.value)}
                                />
                            </FormControl>
                            <FormControl fullWidth variant="standard">
                                <TextField
                                    id="password"
                                    label="Password"
                                    variant="standard"
                                    type="password"
                                    minLength="6"
                                    onChange={(e)=>setPassword(e.target.value)}
                                    required
                                />
                            </FormControl>
                            <Button style={{ marginTop: '20px'}} variant="contained" type="submit">Login</Button>

                        </Paper>
                        </form>
                    </Grid>
                        <Grid sm={4} md={4} xs={12}></Grid>
                    </Grid>
                </Box>
            </Container>

        </Box>
    );
};

export default Login;