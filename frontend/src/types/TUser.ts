type TUser = {
  email: string;
  login: string;
  name: string,
  surname: string,
  city: string,
  gender: string,
  age: string,
  UserRoles: {
      role: string,
      experience: string,
      level: string
  }
}

export default TUser;