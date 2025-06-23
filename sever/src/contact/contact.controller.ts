import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    UseGuards,
    Request,
    ParseIntPipe,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateContactDto } from './dto/create-contact.dto';


@Controller('contacts')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    // Tạo yêu cầu liên hệ - user phải đăng nhập
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post()
    create(@Request() req, @Body() createContactDto: CreateContactDto) {
        createContactDto.userId = req.user.userId; // Lấy userId từ JWT
        return this.contactService.createContact(createContactDto);
    }

    // Admin xem tất cả yêu cầu
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get()
    findAll() {
        return this.contactService.findAll();
    }

    // User xem yêu cầu của mình
    @UseGuards(JwtAuthGuard)
    @Get('my')
    findMy(@Request() req) {
        return this.contactService.findByUser(req.user.userId);
    }

    // Admin cập nhật trạng thái
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Put(':id/status')
    updateStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: string) {
        return this.contactService.updateStatus(id, status);
    }

    // Admin xóa yêu cầu
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.contactService.remove(id);
    }

    //   @UseGuards(JwtAuthGuard)
    //   @UsePipes(new ValidationPipe({ whitelist: true }))
    //   @Post()
    //   create(@Request() req, @Body() createContactDto: CreateContactDto) {
    //     // Thay userId lấy từ JWT thay vì client gửi
    //     createContactDto.userId = req.user.userId;
    //     return this.contactService.createContact(createContactDto);
    //   }
}
