import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    Put,
    Delete,
    UseGuards,
    ParseIntPipe,
    UsePipes,
    ValidationPipe,
    Query,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Controller('properties')
export class PropertyController {
    constructor(private readonly propertyService: PropertyService) { }

    @Get()
    findAll(
        @Query('keyword') keyword?: string,
        @Query('minPrice') minPrice?: string,
        @Query('maxPrice') maxPrice?: string,
        @Query('minArea') minArea?: string,
        @Query('maxArea') maxArea?: string,
        @Query('bedrooms') bedrooms?: string,
        @Query('propertyType') propertyType?: string,
        @Query('province') province?: string,
        @Query('district') district?: string,
        @Query('ward') ward?: string,
        @Query('sort') sort?: string,
        @Query('limit') limit?: string,
        @Query('page') page?: string,
    ) {
        const filters = {
            keyword,
            minPrice: minPrice ? parseInt(minPrice) : undefined,
            maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
            minArea: minArea ? parseInt(minArea) : undefined,
            maxArea: maxArea ? parseInt(maxArea) : undefined,
            bedrooms: bedrooms ? parseInt(bedrooms) : undefined,
            propertyType,
            province,
            district,
            ward,
            sort,
            limit: limit ? parseInt(limit) : undefined,
            page: page ? parseInt(page) : 1,
        };
        return this.propertyService.findAll(filters);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.propertyService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    create(@Body() createPropertyDto: CreatePropertyDto) {
        return this.propertyService.create(createPropertyDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Put(':id')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePropertyDto: UpdatePropertyDto,
    ) {
        return this.propertyService.update(id, updatePropertyDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.propertyService.remove(id);
    }
}
