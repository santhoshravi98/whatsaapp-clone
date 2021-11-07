import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import {auth,provider} from './firebase'
import {actionTypes} from './Reducer'
import { useStateValue } from './StateProvider';


function login() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [{  }, dispatch] = useStateValue()


    const signInWithGoogle = () => {
        auth.signInWithPopup(provider).then(result => {
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user
            })
            console.log(result);
        }).catch(err => {
            console.log(err)
        })
    };

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="login_image">
                </img>
                <div className="login__text">
                    <h1>Sign in</h1>
                </div>
                <Button onClick={signInWithGoogle}>
                    Sign in to Google
                </Button>
            </div>
        </div>
    )
}

export default login
