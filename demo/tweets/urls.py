from django.urls import path

from . import api

urlpatterns = [
    path('api/tweets/', api.TweetsAPI.as_view()),
    path('api/tweet/<int:id>/', api.TweetAPI.as_view()),
]
