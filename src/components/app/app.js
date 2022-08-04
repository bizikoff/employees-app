import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: 'Glad V', salary: 300, increase: false, rise: true, id: 1 },
        { name: 'Alex L', salary: 1200, increase: true, rise: false, id: 2 },
        { name: 'Oleg R', salary: 3000, increase: false, rise: false, id: 3 }
      ],
      term: '',
      filter: 'all'
    }
    this.minId = 4;
  }

  deleteItem = id => {
    this.setState(({ data }) => {
      // const index = data.findIndex(elem => elem.id === id);

      // const before = data.slice(0, index);
      // const after = data.slice(index + 1);
      // const newArr = [...before, ...after];

      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: this.minId++
    }

    this.setState(({ data }) => {
      const newArr = [...data, newItem];

      return {
        data: newArr
      }
    })
  }

  onToggleIncrease = (id) => {
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, increase: !item.increase }
        }
        return item;
      })
    }))
  }

  onToggleRise = (id) => {
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, rise: !item.rise }
        }
        return item;
      })
    }))
  }

  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.name.toLowerCase().indexOf(term) > -1
    })
  }

  onUpdateSearch = (term) => {
    this.setState({term})
  }

  filterPost = (items, filter) => {
    switch(filter) {
      case 'rise':
        return items.filter(item => item.rise);
      case 'moreThen1000':
        return items.filter(item => item.salary > 1000);
      default: 
        return items;
    }
  }

  onFilterSelect = (filter) => {
    this.setState({filter});
  }

  render() {
    const {data, term, filter} = this.state;

    const employees = data.length;
    const employeesOnIncrease = data.filter(elem => elem.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);

    return (
      <div className="app">
        <AppInfo
        employees={employees}
        employeesOnIncrease={employeesOnIncrease} />

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
        </div>

        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleIncrease={this.onToggleIncrease}
          onToggleRise={this.onToggleRise} />
        <EmployeesAddForm
          onAdd={this.addItem} />
      </div>
    );
  }

}

export default App;