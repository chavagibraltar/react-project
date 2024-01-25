import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RemoveIngrident, AddIngrident, SetIngrident } from '../service/ingrident';
//mui
import * as React from 'react';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';

export default function ShoppingList() {
    const dispatch = useDispatch();
    const shoppingList = useSelector(state => state.shoppingList);
    const user = useSelector(state => state.user);
    dispatch(SetIngrident());

    // useEffect(() => {
    //     if (!shoppingList.length)
    //         dispatch(SetIngrident());
    // }, [])

    return (
        <>
            {shoppingList.map((ingrident, i) =>
            (
                <div key={i}>
                    <Box
                        sx={{
                            color: 'action.active',
                            display: 'flex',
                            flexDirection: 'column',
                            '& > *': {
                                marginBottom: 2,
                            },
                            '& .MuiBadge-root': {
                                marginRight: 4,
                            },
                        }}
                    >
                        <div>
                            <Badge >
                                {ingrident.Name}  {ingrident.Count}
                            </Badge>
                            <ButtonGroup>
                                <Button
                                    aria-label="reduce"
                                    onClick={() => {
                                        if (ingrident.Count - 1 == 0) {
                                            console.log("del");
                                            dispatch(RemoveIngrident(ingrident));
                                        }
                                        else
                                            dispatch(AddIngrident(ingrident.Name, -1, user));
                                    }}
                                >
                                    <RemoveIcon fontSize="small" />
                                </Button>
                                <Button
                                    aria-label="increase"
                                    onClick={() => {
                                        dispatch(AddIngrident(ingrident.Name, 1, user));
                                    }}
                                >
                                    <AddIcon fontSize="small" />
                                </Button>
                                <Button variant="outlined" startIcon={<CheckIcon />} onClick={() => dispatch(RemoveIngrident(user, ingrident.Name, ingrident.Id))}>
                                    !קניתי
                                </Button>
                            </ButtonGroup>
                        </div>
                    </Box>
                </div>
            )
            )}
        </>
    );
}