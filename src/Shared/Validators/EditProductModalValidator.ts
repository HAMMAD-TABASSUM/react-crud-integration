import { IsNotEmpty, IsString } from "class-validator";

export class EditProductModalValidator {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  image: string;
}
