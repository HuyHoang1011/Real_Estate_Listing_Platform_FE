import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateContactDto {
  @IsInt()
  @Min(1)
  userId: number; // Thường userId lấy từ JWT, không cần client gửi

  @IsInt()
  @Min(1)
  propertyId: number;

  @IsString()
  @IsNotEmpty()
  message: string;
}
