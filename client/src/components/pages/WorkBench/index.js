import React, { Component } from 'react';
import TextCard from '../../parts/TextCard';

    // Comment out to prevent warnings when needed they are here for easy access 
// import { Container, Row, Col, Button  } from 'reactstrap';
// import API from '../../../utils/API';
// import SweetAlert from 'react-bootstrap-sweetalert';

class WorkBench extends Component {

    constructor(props){
        super(props);

        this.state={

        }
    }

    // componentDidMount(){
    //     console.log(this.state);
    // }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <TextCard
                    title="My workbench"
                    subtitle="Build new Page and Part Components here away from rest of app"
                >
                    To keep code clean build and refine code here. When done developing the code can be ready to be put into its 
                    own component by being cropped from here.
                    
                </TextCard>

                <select
                    onChange={this.handleInputChange}
                >
                    <option name="opt" value={1}>1</option>
                    <option name="opt" value={2}>2</option>
                </select>
            </div>
        );
    }
}

export default WorkBench;