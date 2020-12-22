from django.urls import path

from . import views

urlpatterns = [
  path('', views.index, name='index'),
  path('todos/', views.list, name='list'),
  path('todos/add/', views.add, name='add'),
  path('todos/update/<int:todo_id>', views.update, name='update'),
  path('todos/delete/<int:todo_id>', views.delete, name='delete'),
  path('todos/clearcompleted', views.clear_completed, name='clear_completed')
]