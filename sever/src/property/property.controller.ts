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
    findAll() {
        return this.propertyService.findAll();
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
