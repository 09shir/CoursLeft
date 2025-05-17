import React, { useState, useEffect } from 'react'

import { Amplify } from 'aws-amplify';
import config from '../amplifyconfiguration.json'
import { generateClient } from 'aws-amplify/api'

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CircularProgress from '@mui/material/CircularProgress';
import { Chip, IconButton, Tooltip, TextField } from '@mui/material';

import { updateTerm } from '../graphql/mutations'

Amplify.configure(config);
const client = generateClient()

const Credit = ({term}) => {
    const [editing, setEditing] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [credits, setCredits] = useState(term?.credits || "");

    const handleSubmitCredit = async () => {
        setSubmitting(true);
        if (Number.isInteger(Number(credits))) {
            try {
                await client.graphql({
                    query: updateTerm,
                    variables: {
                        input: {
                            id: term.id,
                            credits: credits,
                        }
                    }
                }).then(() => {
                    term.credits = credits;
                    setSubmitting(false);
                    setEditing(false);
                });
            } catch (err) {
                setCredits(term.credits);
                console.error("Failed to update term credits:", err);
                alert("Something went wrong. Please try again.");
            }
        }
        else {
            setCredits(term.credits);
            alert("Please enter a valid number for credits.");
        }
        setSubmitting(false);
        setEditing(false);
    }

    const toggleEditing = () => {
        setEditing(!editing);
    };

    return (
        <span style={{ 'margin-left': '10px' }}>
            {editing ? (
                submitting ? <CircularProgress color="inherit" size={15}/>
                           : <>
                                <TextField
                                    className="credit-input-field-left"
                                    style={{ 'margin-left': '10px' }}
                                    variant="standard"
                                    size="small"
                                    value={credits}
                                    onChange={(e) => setCredits(e.target.value)}
                                    // onBlur={toggleEditing}
                                    autoFocus
                                />
                                <Tooltip title="Modify Credits" placement="right">
                                    <IconButton onClick={() => {handleSubmitCredit()}} size="small" className="credit-input-save-button-right">
                                        <CheckBoxIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </>
            ) : (
                <Tooltip title={credits ? "Modify credits" : "Add credits"} placement="top">
                    <Chip
                        label={ credits ? `${credits} credits` : "credits n/a" }
                        color="primary"
                        size="small"
                        variant="outlined"
                        sx={{ fontWeight: 500 }}
                        onClick={toggleEditing}
                    />
                </Tooltip>
            )}
        </span>
    )
}

export default Credit;