import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BorrowerDTO } from './dto/borrower.dto';
import { BorrowerService } from './borrower.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateBorrowerResponseDto, GetAllBorrowersResponseDto, GetBorrwerByIdResponseDto, UpdateBorrowerResponseDto, DeleteBorrowerSuccessResponseDto, DeleteBorrowerFailedResponseDto } from './dto/borrowerResponse.dto';

@ApiTags('Borrowers')
@Controller('borrowers')
export class BorrowerController {

    constructor(private readonly borrowerService: BorrowerService) { }


    @Post()
    @ApiOperation({ summary: 'Insert a Borrower' })
    @ApiBody({ type: BorrowerDTO })
    @ApiCreatedResponse({ type: CreateBorrowerResponseDto })
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async createBorrower(@Res() res, @Body() borrowerData: BorrowerDTO) {
        try {
            const new_borrower = await this.borrowerService.createBorrower(borrowerData);
            res.status(201).json({ message: "Borrower insertion successful", data: new_borrower });
        } catch (error) {
            res.status(501).json({ message: "Borrower insertion failed", error: error.message });
        }
    }

    @Get()
    @ApiOperation({ summary: 'Get all Borrowers' })
    @ApiCreatedResponse({ type: GetAllBorrowersResponseDto })
    @UseGuards(JwtAuthGuard)
    async getBorrowers(@Res() res) {
        try {
            const borrowers = await this.borrowerService.getBorrowers();
            res.status(201).json({ message: "Borrowers retrieved successfully", data: borrowers });
        } catch (error) {
            res.status(501).json({ message: "Borrowers retrieval failed", error: error.message });
        }
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get Borrower by ID' })
    @ApiParam({ name: 'id', example: 1 })
    @ApiCreatedResponse({ type: GetBorrwerByIdResponseDto })
    @UseGuards(JwtAuthGuard)
    async getBorrowerById(@Param('id') borrower_id, @Res() res) {
        try {
            const borrower = await this.borrowerService.getBorrowerById(borrower_id);
            res.status(201).json({ message: "Borrowers retrieved successfully", data: borrower });
        } catch (error) {
            res.status(501).json({ message: "Borrower retrieval failed", error: error.message });
        }
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update Borrower by ID' })
    @ApiParam({ name: 'id', example: 1 })
    @ApiBody({ type: BorrowerDTO })
    @ApiCreatedResponse({ type: UpdateBorrowerResponseDto })
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async updateBorrower(@Param('id') borrower_id, @Body() updatedBorrower: BorrowerDTO, @Res() res) {
        try {
            const effectedRows = await this.borrowerService.updateBorrower(borrower_id, updatedBorrower);
            res.status(201).json({ message: "Borrower updated successfully", effectedRows: effectedRows });
        } catch (error) {
            res.status(501).json({ message: "Borrower update failed", error: error.message });
        }
    }

    @Delete(':id/setActive/:isActive')
    @ApiOperation({ summary: 'Delete Borrower' })
    @ApiParam({name: 'id', example: 7})
    @ApiParam({ name: 'isActive', example: false, description: 'true = Restore borrower , false = Delete borrower' })
    @ApiCreatedResponse({type: DeleteBorrowerSuccessResponseDto})
    @ApiConflictResponse({type: DeleteBorrowerFailedResponseDto})
    @UseGuards(JwtAuthGuard)
    async deleteOrRestoreBorrower(@Param('id') id, @Param('isActive') isActive: boolean, @Res() res) {
        console.log(isActive)
        try {
            const response = await this.borrowerService.deleteOrRestoreBorrower(id, { isActive: isActive });
            if (typeof (response) == 'string') {
                res.status(409).json({ message: "Cannot update borrower", Reason: response });
            } else {
                res.status(201).json({ message: "Borrower updated successfully", effectedRows: response });
            }
        } catch (error) {
            res.status(501).json({ message: "Borrower update failed", error: error.message });
        }
    }
}
