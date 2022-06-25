import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import BalanceSummary from "./BalanceSummary";

export default function CartPage() {
    const {cart, setCart, removeItem} = useStoreContext();

    function handleAddItem(productId: number) {
        agent.Cart.addItem(productId)
            .then(cart => setCart(cart))
            .catch(error => console.log(error))
    }

    function handleRemoveItem(productId: number, quantity = 1) {
        agent.Cart.removeItem(productId, quantity)
            .then(() => removeItem(productId,quantity))
            .catch(error => console.log(error))
    }

    if (!cart) return <Typography variant='h3'>Shopping cart is empty</Typography>

    return (
        <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
            <TableHead>
                <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Subtotal</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {cart.items.map((item) => (
                <TableRow
                    key={item.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {item.name}
                    </TableCell>
                    <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
                    <TableCell align="center">
                        <LoadingButton onClick={() => handleRemoveItem(item.productId)} color='error'>
                            <Remove />
                        </LoadingButton>
                        {item.quantity}
                        <LoadingButton onClick={() => handleAddItem(item.productId)} color='primary'>
                            <Add />
                        </LoadingButton>
                    </TableCell>
                    <TableCell align="center">${((item.price * item.quantity) / 100).toFixed(2)}</TableCell>
                    <TableCell align="center">
                        <LoadingButton onClick={() => handleRemoveItem(item.productId, item.quantity)} color='error'>
                            <Delete />
                        </LoadingButton>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>

        <Grid container>
        <Grid item xs={6} />
            <Grid item xs={6}>
                <BalanceSummary />
                <Button
                    component={Link}
                    to='/checkout'
                    variant='contained'
                    size='large'
                    fullWidth
                >
                        Checkout
                </Button>
            </Grid>
        </Grid>
        </>
    )
}