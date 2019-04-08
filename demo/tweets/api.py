from django.http import Http404
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from tweets.models import Tweet
from tweets.serializers import TweetSerializer


class TweetsAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        tweets = Tweet.objects.filter(created_by=request.user)
        serialize = TweetSerializer(tweets, many=True)
        return Response(serialize.data)

    def post(self, request):
        request.data["created_by"] = request.user.id
        serialize = TweetSerializer(data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data, status=status.HTTP_201_CREATED)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)


class TweetAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, id):
        try:
            return Tweet.objects.get(pk=id)
        except Exception as e:
            raise Http404

    def get(self, request, id):
        tweet = self.get_object(id)
        serialize = TweetSerializer(tweet)
        return Response(serialize.data)

    def put(self, request, id):
        tweet = self.get_object(id)
        serialize = TweetSerializer(tweet, data=request.data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data)
        return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        tweet = self.get_object(id)
        tweet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
