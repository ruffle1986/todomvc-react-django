function Todo(props) {

  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="What needs to be done?"
        onKeyUp={ (e) => {
          if (e.code === 'Enter') {
            const input = e.currentTarget
            props.onAdd(input.value.trim())
            input.value = ''
          }
        } }
      />
      <ul className="todo">
        {
          props.items.map((item) => {
            return (
              <li key={ item.id }>
                <input
                  type="checkbox"
                  className="completed"
                  checked={ item.completed }
                  onChange={ () => {
                    props.onChange(item.id, !item.completed)
                  } }
                />
                { item.title }
                <button
                  onClick={ () => {

                    props.onDelete(item.id)

                  } }
                >delete</button>
              </li>
            )
          })
        }
      </ul>
    </React.Fragment>
  )
}