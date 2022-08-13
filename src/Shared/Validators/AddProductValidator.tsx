import { IsNotEmpty, IsString } from "class-validator";

export class AddProductModalValidator {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  image: string;
}
