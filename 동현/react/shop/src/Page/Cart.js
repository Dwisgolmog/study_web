import { TableCell,TableHead,Table,TableBody,TableContainer,Paper,TableRow } from "@mui/material";
import { useSelector,useDispatch } from "react-redux";
import { upCount } from "../store/cart";

function Cart() {
    let state = useSelector((state)=> state.cart)
    let dispatch = useDispatch();

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
                            state.map((item, index) => ( 
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">{item.id}</TableCell>
                                    <TableCell align="left">{item.name}</TableCell>
                                    <TableCell align="left">{item.count}</TableCell>
                                    <TableCell align="left"><button onClick={()=>{dispatch(upCount(item.id))}}>+</button></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Cart