import { Controller, Get, Param, Patch, Res, UseGuards } from '@nestjs/common';
import { FineService } from './fine.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Fines')
@Controller('fines')
export class FineController {
    constructor(private readonly fineService: FineService) { }

    @Get()
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
    @UseGuards(JwtAuthGuard)
    async getFineByBbId(@Param('id') id, @Res() res) {
        try {
            const fine = await this.fineService.getFineByBbId(id);
            res.status(201).json({ message: "Fine retrieved successfully", data: fine });
        } catch (error) {
            res.status(501).json({ message: "Fine retrieval failed", error: error.message });
        }
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getFineById(@Param('id') id, @Res() res) {
        try {
            const fine = await this.fineService.getFineById(id);
            res.status(201).json({ message: "Fine retrieved successfully", data: fine });
        } catch (error) {
            res.status(501).json({ message: "Fine retrieval failed", error: error.message });
        }
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async payFine(@Param('id') fine_id, @Res() res) {
        try {
            const payedFine = await this.fineService.payFine(fine_id);
            res.status(201).json({ message: "Fine paid successfully", fineInfo: payedFine });
        } catch (error) {
            res.status(501).json({ message: "Payment failed", error: error.message });
        }
    }



}
