export class UserDto {
  constructor(user) {
    this.id = user.id;
    this.role = user.role;
    this.email = user.email;
  }
}
