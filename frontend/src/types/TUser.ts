type TUser = {
  email: string;
  login: string;
  name: string,
  surname: string,
  city: string,
  gender: string,
  age: string,
  userRole: {
      role: string,
      experience: string,
      level: string
  }
  statusUser: {
      status: string
  }
}

export default TUser;