import {useEffect, useState} from "react";
import useProfile from "./useProfile";

function useChangeProfile(profile: ReturnType<typeof useProfile> | null) {

    const [email, setEmail] = useState(profile?.user?.email);
    const [name, setName] = useState(profile?.user?.name);
    const [surname, setSurname] = useState(profile?.user?.surname);
    const [city, setCity] = useState(profile?.user?.city);
    // const [role, setRole] = useState(profile?.user?.userRole.role);
    // const [experience, setExperience] = useState(profile?.user?.userRole.experience);
    // const [level, setLevel] = useState(profile?.user?.userRole.level);
    const [age, setAge] = useState(profile?.user?.age);
    const [gender, setGender] = useState(profile?.user?.gender);
    const [role, setRole] = useState(profile?.user?.userRole.role);
    const [experience, setExp] = useState(profile?.user?.userRole.experience);
    const [level, setLevel] = useState(profile?.user?.userRole.level);

    useEffect(() => {
        setEmail(profile?.user?.email)
        setName(profile?.user?.name)
        setSurname(profile?.user?.surname)
        setCity(profile?.user?.city)
        setAge(profile?.user?.age)
        setGender(profile?.user?.gender)
        setRole(profile?.user?.userRole.role)
        setExp(profile?.user?.userRole.experience)
        setLevel(profile?.user?.userRole.level)
    }, [profile]);

    return {
        email, setEmail,
        name, setName,
        surname, setSurname,
        city, setCity,
        age, setAge,
        gender, setGender,
        role, setRole,
        experience, setExp,
        level, setLevel,
    }

}

export default useChangeProfile;