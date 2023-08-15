import { TableCell,TableHead,Table,TableBody,TableContainer,Paper,TableRow } from "@mui/material";

function Cart() {
    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">상품명</TableCell>
                            <TableCell align="left">수량</TableCell>
                            <TableCell align="left">변경하기</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">1</TableCell>
                                <TableCell align="left">안녕</TableCell>
                                <TableCell align="left">안녕</TableCell>
                                <TableCell align="left">안녕</TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Cart