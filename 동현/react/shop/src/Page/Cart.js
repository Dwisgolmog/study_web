import { TableCell,TableHead,Table,TableBody,TableContainer,Paper,TableRow } from "@mui/material";
import { useSelector } from "react-redux";

function Cart() {
    let state = useSelector((state)=> state.cart)

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
                        {
                            state.map((item,product)=>{
                                return(
                                    <TableRow key={product}>
                                        <TableCell component="th" scope="row">{item.id}</TableCell>
                                        <TableCell align="left">{item.name}</TableCell>
                                        <TableCell align="left">{item.count}</TableCell>
                                        <TableCell align="left">안녕</TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Cart