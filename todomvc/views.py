from django.shortcuts import render
from django.http import HttpResponse
import json
from http import HTTPStatus
from todomvc.models import Todo
from django.core.serializers import serialize

def index(request):
  return HttpResponse(render(request, 'todomvc/index.html', {}))

def list(request):
  items = Todo.objects.all()
  result = []
  for item in items:
    result.append({
      'id': item.id,
      'title': item.title,
      'completed': item.completed
    })
  return HttpResponse(json.dumps(result))

def add(request):
  if (len(request.body)):
    request_body = json.loads(request.body)
    todo = Todo(
      title=request_body.get('title'),
      completed=False
    )
    todo.save()
  return HttpResponse(todo)

def update(request, todo_id):
  if (len(request.body)):
    request_body = json.loads(request.body)
    todo = Todo.objects.get(id=todo_id)
    todo.completed = request_body.get('completed')
    todo.save()
  return HttpResponse(status=204)

def delete(request, todo_id):
  todo = Todo.objects.get(id=todo_id)
  todo.delete()
  return HttpResponse(status=204)

def clear_completed(request):
  Todo.objects.filter(completed=True).delete()
  return HttpResponse(status=204)