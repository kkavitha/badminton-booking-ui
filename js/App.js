import React from 'react';
import 'react-dropdown-multiselect/style.css'
import '../css/app.css'
import Dropdown from "./Dropdown";
import $ from 'jquery';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            selected: [],
            options: []
        }
    }

    componentWillMount() {
        let options= [];
        $.ajax({
            url: "http://localhost:5000/locations",
            type: "GET",
            contentType: "application/json",
            success: function (data) {
                data.locations.map(location => options.push({value: location, label: location}));

            }
        });
        this.setState({options:options});
    }

    _onSelect(option) {
        this.setState({selected: option})
    }

    render() {
        return (
            <div><Dropdown options={this.state.options} onChange={this._onSelect.bind(this)} value={this.state.selected}
                      placeholder="Select an option"/>
                {/*<Dropdown options={} onChange={} value={}/>*/}
                <div><button name="Search"></button></div>
            </div>


        )
    }

}

export default App;
