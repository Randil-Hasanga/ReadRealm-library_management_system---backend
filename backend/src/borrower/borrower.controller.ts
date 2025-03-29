import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { BorrowerDTO } from './borrower.dto';
import { BorrowerService } from './borrower.service';

@Controller('borrowers')
export class BorrowerController {

    constructor(private readonly borrowerService : BorrowerService) {}

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async createBorrower(@Res() res, @Body() borrowerData : BorrowerDTO) {
        try {
            const new_borrower = await this.borrowerService.createBorrower(borrowerData);
            res.status(201).json({ message: "Borrower insertion successful", data: new_borrower });
        } catch (error) {
            res.status(501).json({ message: "Borrower insertion failed", error: error.message });
        }
    }

    @Get()
    async getBorrowers(@Res() res) {
        try {
            const borrowers = await this.borrowerService.getBorrowers();
            res.status(201).json({ message: "Borrowers retrieved successfully", data: borrowers });
        } catch (error) {
            res.status(501).json({ message: "Borrowers retrieval failed", error: error.message });
        }
    }

    @Get(':id')
    async getBorrowerById (@Param('id') borrower_id, @Res() res) {
        try {
            const borrower = await this.borrowerService.getBorrowerById(borrower_id);
            res.status(201).json({ message: "Borrowers retrieved successfully", data: borrower });
        } catch (error) {
            res.status(501).json({ message: "Borrower retrieval failed", error: error.message });
        }
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    async updateBorrower(@Param('id') borrower_id,@Body() updatedBorrower : BorrowerDTO, @Res() res) {
        try {
            const effectedRows = await this.borrowerService.updateBorrower(borrower_id, updatedBorrower);
            res.status(201).json({ message: "Borrower updated successfully", effectedRows: effectedRows });
        } catch (error) {
            res.status(501).json({ message: "Borrower update failed", error: error.message });
        }
    }

    @Delete(':id/setActive/:isActive')
    async deleteOrRestoreBorrower (@Param('id') id,@Param('isActive') isActive : boolean, @Res() res)  {
        console.log(isActive)
        try {
            const effectedRows = await this.borrowerService.deleteOrRestoreBorrower(id, {isActive : isActive});
            res.status(201).json({ message: "Borrower updated successfully", effectedRows: effectedRows });
        } catch (error) {
            res.status(501).json({ message: "Borrower update failed", error: error.message });
        }
    }
}
