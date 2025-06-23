import { IsInt, Min } from 'class-validator';

export class RemoveFavoriteDto {
  @IsInt()
  @Min(1)
  propertyId: number;
}
