from task_api.views import TaskViewSet
from rest_framework.routers import  DefaultRouter

router = DefaultRouter()
router.register('tasks', TaskViewSet, basename= 'tasks')
urlpatterns = router.urls