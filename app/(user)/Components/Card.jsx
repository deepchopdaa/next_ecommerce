import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from "../../../public/images/product1.jpg";
import Image from 'next/image';
export default function ProductCard() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <Image
                src={logo}
                alt="Logo"
                className="object-contain"
            />

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Beardo Perfume for men 20ml * 4
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="success" href="#contained-buttons">
                    Add to Cart
                </Button>
                <Button variant="contained" color="info" href="#contained-buttons">
                    Buy Now
                </Button>
            </CardActions>
        </Card>
    );
}