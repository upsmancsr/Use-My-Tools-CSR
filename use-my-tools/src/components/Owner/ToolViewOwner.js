import React, { Component } from 'react';

import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';

import ImageCarousel from '../ImageCarousel';
import RequestDatesPopUp from '../RequestTool/RequestDatesPopUp';
import DeleteDialog from './DeleteDialog';

import axios from 'axios';

import './css/ToolViewOwner.css';

const styles = theme => ({
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
    },
    cardContent: {
        flexGrow: 1,
        // maxHeight: 100,
        minHeight: 200,
        overflowY: "scroll"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        "width": "90%"
    },
    dense: {
        marginTop: 16
    },
    menu: {
        width: 200
    }

})

class ToolViewOwner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tool: {},
            renterUid: '',
            brand: '',
            name: '',
            description: '',
            price: 0,
            available: false,
            rented: false,
            rating: 0,
            selectedFile: null,
        };
    }

    componentDidMount() {
        let tool_id = this.props.match.params.id;
        this.getToolInfo(tool_id);
    }

    getToolInfo = tool_id => {
        axios.get(`/api/tools/owner/singletool/${tool_id}`)
            .then(tool => {
                this.setState({
                    tool: tool.data,
                    renterUid: tool.data.renter_uid,
                    brand: tool.data.brand,
                    name: tool.data.name,
                    description: tool.data.description,
                    price: tool.data.price,
                    available: tool.data.available,
                    rented: tool.data.rented,
                    rating: tool.data.rating,
                }, () => { 
                    console.log("ToolView state.tool after getToolInfo:", this.state.tool);
                });
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    updateToolDetails = event => {
        console.log('TVO state on updateToolDetails: ', this.state);
        const id = this.props.match.params.id;
        const tool = {
            brand: this.state.brand,
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            available: this.state.available
        }

        axios.put(`/api/tools/updatetooldetails/${id}`, tool)
            .then(tool => {
                console.log("Response from /updatetooldetails", tool.data);
                this.setState({
                    brand: tool.data.brand,
                    name: tool.data.name,
                    description: tool.data.description,
                    price: tool.data.price,
                    available: tool.data.available,
                })
                .catch(error => {
                    console.log(error.message);
                });
            })

    }

    handleFileChange = event => {
        // this.setState({
        //   selectedFile: event.target.files[0]
        // });
        // let tool_id = this.props.match.params.id;
        const newImageData = new FormData();
        newImageData.append('id', this.props.match.params.id);
        newImageData.append('image_file', event.target.files[0]);
        axios.post('/api/tools/newimage', newImageData)
            .then(response => {
                console.log('/newimage response: ', response);
            })
            .catch(error => {
                console.log(error.messages);
            })
    };

    handleToolDelete = event => {
        this.props.history.push({        
            pathname: "/yourtools"
        });
    };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value
        }, () => console.log(this.state));
    };

    toggleAvailable = event => {
        this.setState({
            available: event.target.checked
        }, () => console.log('state.available:', this.state.available));
    };

    render() {
        const { tool } = this.state;
        const { classes } = this.props;
        return (
            <div className="pageContainer">
                <div className="title">
                    <Typography gutterBottom variant="h5" component="h2">
                        Your Tool: {tool.brand}{' '}{tool.name}
                    </Typography>
                    
                </div>

                <div className="main-container">
                    <div className="left-container">
                        {tool.images ? (
                            <ImageCarousel toolImages={tool.images} />
                        ) : (
                            ''
                        )}
                        <div className ="add-image">
                            <p>Add image:   </p>
                            <input
                                accept="image/*"
                                className="image-input"
                                id="contained-button-file"
                                multiple
                                type="file"
                                name="image"
                                onChange={this.handleFileChange}
                            />
                        </div>
                    </div>

                    <div className="right-container">
                        <div className="tool-info">
                            
                            <form onSubmit={this.updateToolDetails}>

                                <TextField
                                    id="outlined-brand"
                                    label="Brand"
                                    className={classes.textField}
                                    value={this.state.brand}
                                    onChange={this.handleChange("brand")}
                                    margin="normal"
                                    variant="outlined"
                                />

                                <TextField
                                    id="outlined-name"
                                    label="Name"
                                    className={classes.textField}
                                    value={this.state.name}
                                    onChange={this.handleChange("name")}
                                    margin="normal"
                                    variant="outlined"
                                />

                                <TextField
                                    id="outlined-description"
                                    label="Description"
                                    className={classes.textField}
                                    value={this.state.description}
                                    onChange={this.handleChange("description")}
                                    margin="normal"
                                    variant="outlined"
                                />

                                <TextField
                                    id="outlined-price"
                                    label="Daily Rental Price"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }}
                                    className={classes.textField}
                                    value={this.state.price}
                                    onChange={this.handleChange("price")}
                                    margin="normal"
                                    variant="outlined"
                                />

                                <div className="available-container">
                                    <label for="availableCheck">Available:</label>
                                    <input id="availableCheck" 
                                            type="checkbox" 
                                            checked={this.state.available}
                                            onClick = {this.toggleAvailable}
                                    /> 
                                </div>

                                <Button variant="outlined" color="primary" className="button" type="submit" >
                                    Save Changes
                                </Button>

                            </form>
                        </div>

                        <div className="tool-management">
                            <RequestDatesPopUp 
                                toolId={this.state.tool.id} 
                                userType="owner" 
                            />

                            <DeleteDialog 
                                toolId={this.props.match.params.id} 
                                handleToolDelete={this.handleToolDelete} 
                                hasIncompleteRentals={tool.hasIncompleteRentals}
                            />
                        </div>
                    </div>
                    {/* end right-container */}

                </div> 
                {/* end main-container */}

            </div>
            // end page-container 
        )
    }
}

export default withStyles(styles)(ToolViewOwner);