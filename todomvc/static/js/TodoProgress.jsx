function TodoProgress(props) {
  let plural = false
  const activeItems = props.items.filter(item => !item.completed)
  if (activeItems.length > 1) {
    plural = true
  }
  return (
    <div className="progress">
      { activeItems.length } item{ plural ? 's' : '' } left
    </div>
  )
}