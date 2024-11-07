import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";

export class UserDTO {
  @IsNotEmpty()
  username!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  password!: string;
}

export class LoginDTO {
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;
}
