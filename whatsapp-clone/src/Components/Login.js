import React from 'react'
import './Login.css'
import logo from '../whatsapp_logo.png'
import { Button } from '@material-ui/core'
import { auth, googleProvider } from '../firebase'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'

function Login() {
    const[{},dispatch]=useStateValue();
    const signIn=()=>{
        auth.signInWithPopup(googleProvider)
        .then((result) =>{
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user,
            });
        })
        .catch((error) =>alert(error.message));
    }
    return (
        <div className="login">
            <div className="login__container">
                <img src={logo} alt=""/>
                <div className="login__text">
                    <h1>Sign in to Whatsapp</h1>
                </div>
                <Button type="submit" onClick={signIn}>
                    Sign In With Google
                </Button>
                
            </div>
        </div>
    )
}

export default Login
