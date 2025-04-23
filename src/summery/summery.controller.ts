import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { SummeryService } from './summery.service';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { BorrowedBooksResponseDto } from 'src/borrowedbooks/dto/BorrowedBooksResponse.dto';

@Controller('summary')
export class SummeryController {
    constructor(private readonly summeryService: SummeryService) { }

    @Get()
    @ApiOperation({ summary: "Get Summery for dashboard" })
    @UseGuards(JwtAuthGuard)
    async getDashboardSummery(@Res() res) {
        try {
            const summery = await this.summeryService.getDashboardSummery();
            if (!summery) {
                return res.status(404).json({ message: 'Summery not found' });
            }
            res.status(200).json({ message: 'Summery retrieved successfully', data: summery });
        } catch (error) {
            res.status(501).json({ message: 'retrieval failed', error: error.message });
        }
    }
}
