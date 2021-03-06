import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import './app.css';
import ItemAddForm from '../item-add-form';

export default class App extends Component {
  maxId = 100;

  createTodoItem = label => {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  };

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    term: '',
    filter: 'all'
  };

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray
      };
    });
  };

  addItem = text => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];
      return {
        todoData: newArray
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex(el => el.id === id);

    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName]
    };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  onSearchPage = term => {
    this.setState({ term });
  };

  onFilterChange = filter => {
    this.setState({ filter });
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter(item => {
      return item.label.toLowerCase.indexOf(term.toLowerCase) > -1;
    });
  }

  filter(items, filter) {
    // eslint-disable-next-line default-case
    switch (filter) {
      case 'all':
        return items;
      case 'done':
        return items.filter(item => !item.done);
      case 'active':
        return items.filter(item => !item.important);
    }
  }

  render() {
    const { todoData, term, filter } = this.state;
    const doneCount = todoData.filter(el => el.done === true).length;
    const todoCount = todoData.length - doneCount;
    const visibleItems = this.filter(this.search(todoData, term), filter);

    return (
      <div className='todo-app'>
        <AppHeader todo={todoCount} done={doneCount} />
        <div className='search-panel d-flex'>
          <SearchPanel onSearchPage={this.onSearchPage} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
