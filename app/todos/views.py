from collections import OrderedDict

from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from django.core.cache import cache

from todos.models import Todo
from todos.serializers import TodoSerializer

from todos.utils import how_many_seconds_until_midnight


# Create your views here.
class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

    def get_todos_response(self, data):
        ttl = how_many_seconds_until_midnight()
        created_todos = cache.get_or_set('created_todos', 0, timeout=ttl)
        updates_on_todos = cache.get_or_set('updates_on_todos', 0, timeout=ttl)
        completed_todos = cache.get_or_set('completed_todos', 0, timeout=ttl)
        deleted_todos = cache.get_or_set('deleted_todos', 0, timeout=ttl)

        res_data =  OrderedDict([
            ('created_todos', created_todos),
            ('completed_todos', completed_todos),
            ('deleted_todos', deleted_todos),
            ('updates_on_todos', updates_on_todos),
            ('data', data)
        ])

        return res_data

    def list(self, request):
        serializer = self.get_serializer(self.get_queryset(), many=True)
        response_data = self.get_todos_response(serializer.data)

        return Response(response_data)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        # increament created todos
        cache.incr('created_todos', 1)

        response_data = self.get_todos_response(serializer.data)

        headers = self.get_success_headers(serializer.data)

        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, pk=None, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        completed_todos = Todo.objects.filter(is_done=True).count()
        cache.incr('updates_on_todos', 1)
        cache.set('completed_todos', completed_todos)

        response_data = self.get_todos_response(serializer.data)

        return Response(response_data)

    def destroy(self, request, pk=None):
        instance = self.get_object()
        self.perform_destroy(instance)
        cache.incr('deleted_todos', 1)
        return Response(status=status.HTTP_204_NO_CONTENT)
