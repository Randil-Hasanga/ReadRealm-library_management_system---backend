import { Controller, Get, Param, Patch, Res, UseGuards } from '@nestjs/common';
import { FineService } from './fine.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { FineErrorResponseDto, FineNotFoundDto, FinePaidResponseDto, GetFinesResponseDto } from './dto/fineResponse.dto';

@ApiTags('Fines')
@Controller('fines')
export class FineController {
    constructor(private readonly fineService: FineService) { }

    @Get()
    @ApiOperation({ summary: "Get All fines" })
    @ApiCreatedResponse({ type: GetFinesResponseDto })
    @UseGuards(JwtAuthGuard)
    async getFines(@Res() res) {
        try {
            const fines = await this.fineService.getFines();
            res.status(201).json({ message: "Fines retrieved successfully", data: fines });
        } catch (error) {
            res.status(501).json({ message: "Fines retrieval failed", error: error.message });
        }
    }

    @Get('bb/:id')
    @ApiParam({ name: 'id', example: 1 })
    @ApiOperation({ summary: "Get fine by borrowed book id" })
    @ApiCreatedResponse({ type: GetFinesResponseDto })
    @ApiNotFoundResponse({ type: FineNotFoundDto })
    @UseGuards(JwtAuthGuard)
    async getFineByBbId(@Param('id') id, @Res() res) {
        try {
            const fine = await this.fineService.getFineByBbId(id);
            if (typeof (fine) == 'object') {
                res.status(201).json({ message: "Fine retrieved successfully", data: fine });
            } else {
                res.status(404).json({ message: "Fine not found" });
            }
        } catch (error) {
            res.status(501).json({ message: "Fine retrieval failed", error: error.message });
        }
    }

    @Get(':id')
    @ApiParam({ name: 'id', example: 1 })
    @ApiOperation({ summary: "Get fine by fine id" })
    @ApiCreatedResponse({ type: GetFinesResponseDto })
    @ApiNotFoundResponse({ type: FineNotFoundDto })
    @UseGuards(JwtAuthGuard)
    async getFineById(@Param('id') id, @Res() res) {
        try {
            const fine = await this.fineService.getFineById(id);
            if (typeof (fine) == 'object') {
                res.status(201).json({ message: "Fine retrieved successfully", data: fine });
            } else {
                res.status(404).json({ message: "Fine not found" });
            }
        } catch (error) {
            res.status(501).json({ message: "Fine retrieval failed", error: error.message });
        }
    }

    @Patch(':id')
    @ApiParam({ name: 'id', example: 1 })
    @ApiOperation({ summary: "Pay fine by id" })
    @ApiCreatedResponse({ type: FinePaidResponseDto })
    @ApiNotFoundResponse({ type: FineErrorResponseDto })
    @UseGuards(JwtAuthGuard)
    async payFine(@Param('id') fine_id, @Res() res) {
        try {
            const payedFine = await this.fineService.payFine(fine_id);
            if (typeof (payedFine) == 'object') {
                res.status(201).json({ message: "Fine paid successfully", fineInfo: payedFine });
            } else {
                res.status(404).json({ message: "Fine already paid or does not exist" });
            }
        } catch (error) {
            res.status(501).json({ message: "Payment failed", error: error.message });
        }
    }



}
