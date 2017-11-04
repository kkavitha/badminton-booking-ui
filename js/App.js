import React from 'react';
import 'react-dropdown-multiselect/style.css'
import '../css/app.css'
import Dropdown from "./Dropdown";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            selected: [],
            options:[]
        }
    }

    componentWillMount(){
        window.fetch("http://localhost:5000/locations",{
            method: 'GET'
        }).then((data) =>{
            console.log(data);
            this.setState({options: data});
        })
    }

    _onSelect(option) {
        this.setState({selected: option})
    }

    render() {

        const options = [
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' },
            {
                type: 'group', name: 'group1', items: [
                { value: 'three', label: 'Three' },
                { value: 'four', label: 'Four' }
            ]
            },
            {
                type: 'group', name: 'group2', items: [
                { value: 'five', label: 'Five' },
                { value: 'six', label: 'Six' }
            ]
            }
        ];

        let defaultOption = this.state.selected;

        return (
            <Dropdown options={options} onChange={this._onSelect.bind(this)} value={defaultOption} placeholder="Select an option" />
        )
    }

}

export default App;
