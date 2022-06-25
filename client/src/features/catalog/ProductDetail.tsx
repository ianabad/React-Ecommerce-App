import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Product } from "../../app/models/product";

export default function ProductDetail() {
const {cart, setCart, removeItem} = useStoreContext();
const {id} = useParams<{id: string}>();
const [product, setProduct] = useState<Product | null>(null);
const [quantity, setQuantity] = useState(0);
const item = cart?.items.find(i => i.productId === product?.id);

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        agent.Catalog.details(parseInt(id))
            .then(response => setProduct(response))
            .catch(error => console.log(error))
    }, [id, item])

    function handleInputChange(event: any) {
        if (event.target.value > 0) {
            setQuantity(parseInt(event.target.value));
        }
    }

    function handleUpdateCart() {
        if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            agent.Cart.addItem(product?.id!, updatedQuantity)
                .then(cart => setCart(cart))
                .catch(error => console.log(error));
        } else {
            const updatedQuantity = item.quantity - quantity;
            agent.Cart.removeItem(product?.id!, updatedQuantity)
                .then(() => removeItem(product?.id!, updatedQuantity))
                .catch(error => console.log(error));
        }
    }

    if (!product) return <h4>Product not found</h4>
    
    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-2_large.png" alt={product.name} style={{width: '100'}} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{mb:2}} />
                <Typography variant='h4' color='text.secondary'>${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField 
                            variant='outlined'
                            type='number'
                            label='Quantity in Cart'
                            fullWidth
                            value={quantity}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={item?.quantity === quantity}
                            onClick={handleUpdateCart}
                            sx={{height: '55px'}}
                            color='primary'
                            size='large'
                            variant='contained'
                            fullWidth
                        >
                            {item ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}