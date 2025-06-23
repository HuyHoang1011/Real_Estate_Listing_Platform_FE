import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    Min,
    MinLength,
} from 'class-validator';

export enum PropertyType {
    HOUSE = 'house',
    APARTMENT = 'apartment',
    LAND = 'land',
}

export class CreatePropertyDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @MinLength(10)
    description: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    @IsPositive()
    area: number;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;

    @IsEnum(PropertyType)
    type: PropertyType;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    images?: string[];

    @IsNumber()
    @Min(0)
    bedrooms: number;

    @IsNumber()
    @Min(0)
    bathrooms: number;
}
