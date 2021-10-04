export interface IUser {
  readonly _id: string;
  readonly name: string;
  readonly email: string;
  readonly username: string;
  readonly avatar: string;
  token: string;
}
