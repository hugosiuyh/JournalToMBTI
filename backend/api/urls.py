from django.urls import path
from .views import AnalyzeJournal, FindFriends

urlpatterns = [
    path('analyze/', AnalyzeJournal.as_view(), name='analyze-journal'),
    path('friends/', FindFriends.as_view(), name='find-friends'),
]
