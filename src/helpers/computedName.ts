
type FirstLastName = {
  firts_name: string;
  last_name: string;
};


type WithFullName<T> = T & {
  fullName: string;
};

export function computeFullName<User extends FirstLastName>(
  user: User
): WithFullName<User> {
  return {
    ...user,
    fullName: user.firts_name + " " + user.last_name,
  };
}
