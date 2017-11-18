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
            options: [],
            selectedTimeSlot:[],
            timeSlots:[
                {"value":"s101","label":"12-1 AM"},
                {"value":"s102","label":"1-2 AM"},
                {"value":"s103","label":"2-3 AM"},
                {"value":"s104","label":"3-4 AM"},
                {"value":"s105","label":"4-5 AM"},
                {"value":"s106","label":"5-6 AM"},
                {"value":"s107","label":"6-7 AM"},
                {"value":"s108","label":"7-8 AM"},
                {"value":"s109","label":"8-9 AM"},
                {"value":"s110","label":"9-10 AM"},
                {"value":"s111","label":"10-11 AM"},
                {"value":"s112","label":"11-12 AM"},
                {"value":"s113","label":"12-1 PM"},
                {"value":"s114","label":"1-2 PM"},
                {"value":"s115","label":"2-3 PM"},
                {"value":"s116","label":"3-4 PM"},
                {"value":"s117","label":"4-5 PM"},
                {"value":"s118","label":"5-6 PM"},
                {"value":"s119","label":"6-7 PM"},
                {"value":"s120","label":"7-8 PM"},
                {"value":"s121","label":"8-9 PM"},
                {"value":"s122","label":"9-10 PM"},
                {"value":"s123","label":"10-11 PM"},
                {"value":"s124","label":"11-12 PM"}
                ]
        }
    }

    componentWillMount() {
        let options= [];
        $.ajax({
            url: "http://127.0.0.1:5000/locations",
            type: "GET",
            contentType: "application/json",
            success: function (data) {
                data.locations.map(location => options.push({value: location, label: location}));

            },
            error: function (error) {
                console.log(error);
            }
        });
        this.setState({options:options});
    }

    _onSelect(option) {
        this.setState({selected: option})
    }

    _onSelectTimeSlot(option) {
        this.setState({selectedTimeSlot: option})
    }

    searchSlots(){
        console.log(this.state.selectedTimeSlot);
        console.log(this.state.selected);
        let slots = this.state.selectedTimeSlot.map(slot => slot.value);
        let area = this.state.selected.map(area => area.value);
        console.log(slots);
        console.log(area);
        $.ajax({
            url: "http://127.0.0.1:5000/get-availability",
            type: "POST",
            contentType: "application/json",
            data:JSON.stringify({"slots":slots, "area": area}),
            success: function (data) {
               console.log(data)
            }
        });

    }

    render() {
        return (
            <div className="wrapper">
                <div className="heading">Book and Play!</div>
                <Dropdown className="dropdowns" options={this.state.options} onChange={this._onSelect.bind(this)} value={this.state.selected}
                      placeholder="Select an option"/>
                <Dropdown className="dropdowns" options={this.state.timeSlots} onChange={this._onSelectTimeSlot.bind(this)} value={this.state.selectedTimeSlot}/>
                <button className="search_button" name="Search" onClick={this.searchSlots.bind(this)}>Search slots</button>
            </div>


        )
    }

}

export default App;
