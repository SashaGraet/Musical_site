import React, { useContext, useEffect, useState } from "react";
import {ProfileContext} from "../App";

const Profile = () => {

    const profile = useContext(ProfileContext)
    console.log(profile?.user)

    // useEffect(() => {
    //     if(localStorage.getItem('token')) {
    //     store.checkAuth()
    //     }
    // }, [])

    return (
        <div>
            {`Пользователь ${profile?.user ? profile.user.login : "не в сети"}`}
        </div>
    )
}

export default Profile;