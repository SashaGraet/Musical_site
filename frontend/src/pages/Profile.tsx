import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const Profile = () => {

    const {store} = useContext(Context)

    // useEffect(() => {
    //     if(localStorage.getItem('token')) {
    //     store.checkAuth()
    //     }
    // }, [])

    return (
        <div>
            {`Пользователь в сети ${store.user.login}`}
        </div>
    )
}

export default observer(Profile);