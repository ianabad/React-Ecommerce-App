import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import { Product } from "../../app/models/product";

interface Props {
    product: Product;
}

export default function ProductCard({product}: Props) {
    const [loading, setLoading] = useState(false);
    const {setCart} = useStoreContext();

    function handleAddItem(productId: number) {
        setLoading(true);
        agent.Cart.addItem(productId)
            .then(cart => setCart(cart))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }
    
    return (
        <Card>
            <CardHeader 
                avatar={
                    <Avatar sx={{bgcolor: 'primary.main'}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: {fontWeight: 'bold', color: 'primary.main'}
                }}
            />
            <CardMedia
                sx={{height: 140, backgroundSize: 'contain', bgcolor: 'primary.light'}}
                component="img"
                image="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-2_large.png"
                alt="product"
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom color='text.secondary' variant="h5" component="div">
                    ${(product.price / 100).toFixed(2)} 
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton 
                    loading={loading} 
                    onClick={() => handleAddItem(product.id)} 
                    size="small">Add to cart</LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    )
}