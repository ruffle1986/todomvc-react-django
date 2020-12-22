class TodoSmart extends React.Component {

  state = {
    items: [],
    filter: null
  }

  async componentDidMount() {
    const response = await axios.get('http://localhost:8000/todos')
    if (Array.isArray(response.data))
    this.setState({
      items: response.data
    })
  }

  getItems() {
    switch (this.state.filter) {
      case 'active': {
        return this.state.items.filter(item => !item.completed)
      }
      case 'completed': {
        return this.state.items.filter(item => item.completed)
      }
    }
    return this.state.items
  }

  render() {
    return (
      <React.Fragment>
        <Todo
          items={
            this.getItems()
          }
          onDelete={ (id) => {

            axios.delete(`http://localhost:8000/todos/delete/${id}`)

            this.setState({
              items: this.state.items.filter((item) => item.id !== id)
            })

          } }
          onAdd={ async (title) => {

            const response = await axios.post('http://localhost:8000/todos/add/', {
              title
            })

            this.setState({
              items: [
                ...this.state.items,
                response.data
              ]
            })
          } }
          onChange={ (id, completed) => {

            const items = this.state.items.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  completed
                }
              }
              return item
            })

            axios.patch(`http://localhost:8000/todos/update/${id}`, {
              completed
            })

            this.setState({ items })

          } }
        />
        { this.state.items.length > 0 && (
          <React.Fragment>
            <div className="progress">
              <TodoProgress items={ this.state.items } />
            </div>
            <div className="filters">
              <button onClick={ () => this.setState({ filter: null }) }>All</button>
              <button onClick={ () => this.setState({ filter: 'active' }) }>Active</button>
              <button onClick={ () => this.setState({ filter: 'completed' }) }>Completed</button>
            </div>
          </React.Fragment>
        ) }
        <div className="actions">
          { this.state.items.some(item => item.completed) && (
            <button
              onClick={ () => {
                this.setState({
                  items: this.state.items.filter(item => !item.completed)
                })

                axios.delete('http://localhost:8000/todos/clearcompleted')
              } }
            >
              Clear completed
            </button>
          ) }
        </div>
      </React.Fragment>
    )
  }
}