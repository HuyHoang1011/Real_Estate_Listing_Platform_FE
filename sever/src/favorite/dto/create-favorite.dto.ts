import { IsInt, Min } from 'class-validator';

export class AddFavoriteDto {
  @IsInt({ message: 'propertyId phải là số nguyên' })
  @Min(1, { message: 'propertyId phải lớn hơn hoặc bằng 1' })
  propertyId: number;
}
