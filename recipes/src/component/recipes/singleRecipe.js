import { useSelector, useDispatch } from "react-redux";
import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { AddIngrident } from '../service/ingrident';
import * as actionType from '../store/action';
//mui
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Checkbox from '@mui/material/Checkbox';
import ModeIcon from '@mui/icons-material/Mode';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function SingleRecipe({ recipe }) {
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    const handleChange = (event, ingrident,) => {
        console.log(event.target.checked)
        if (!event.target.checked) {
            dispatch(AddIngrident(ingrident.Name, -1, user))
        }
        else {
            dispatch(AddIngrident(ingrident.Name, 1, user))
        }
    };
    const handleEditClick = () => {
        dispatch({ type: actionType.SET_EDIT_RECIPE, payload: recipe })
        navigate("/recipes/editRecipe")
        console.log("edit")
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (<>
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {recipe.UserId === user?.Id ? user?.Name : 'C'}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={recipe.Name}
            />
            <CardMedia
                component="img"
                height="194"
                image={recipe.Img}
                alt={`תמונה של ${recipe.name}`}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {recipe.Description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton aria-label="edit">
                    <ModeIcon
                        onClick={handleEditClick}
                    />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>החומרים:</Typography>
                    <Typography paragraph>
                        {recipe.Ingrident.map((m, i) =>
                            <div className="recipeDetails" key={i}>
                                <Checkbox onChange={(e) => handleChange(e, m)
                                }
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                {`${m?.Count} ${m?.Type !== '-' ? m?.Type : ''} ${m?.Name}`}
                            </div>
                        )}
                    </Typography>
                    <Typography paragraph>הוראות הכנה:</Typography>
                    <Typography paragraph>
                        <ul className="recipeDetails">{recipe.Instructions.map((r, i) =>
                            <li key={i}>{r}</li>
                        )}</ul>
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    </>
    );
}