import React from 'react';
import axios from 'axios';

export default class PersonList extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/user`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
        console.log(persons);

      })
  }

  render() {
    return (
      <ul>
        {
          this.state.persons
            .map(person =>
              <li key={person.id}>{person.email}</li>
            )
        }
        {
          this.state.persons
            .map(person =>
              <li key={person.id}>{person.tel}</li>
            )
        }
        {
          this.state.persons
            .map(person =>
              <li key={person.id}>{person.appointment.date}</li>
            )
        }
      </ul>
      
    )
  }
}