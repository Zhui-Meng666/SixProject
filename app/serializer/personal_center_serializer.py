from rest_framework import serializers
from app import models
from rest_framework.exceptions import ValidationError
import re


# 注册信息序列化类
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = '__all__'


# 修改身份序列化类
class ChangeIdentitySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserIdentity
        fields = '__all__'


# 修改背景图序列化类
class ChangeBackPictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserInfo
        fields = ['student_id', 'back_picture']


# 个人中心展示 个人基本信息序列化类
class UserShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['student_id', 'gender', 'introduction']


# 个人中心展示 个人信息序列化类
class UserShowInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserInfo
        fields = '__all__'


# 个人中心展示 个人身份序列化类
class UserShowIdentitySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserIdentity
        fields = '__all__'


# 个人中心展示 个人相册序列化类
class UserShowAlbumSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserAlbum
        fields = '__all__'


# 个人中心收藏序列化类
class UserCollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserCollection
        fields = ['student_id', 'video_link', 'video_title', 'video_cover_link']


# 个人中心奖品序列化类
class UserPrizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserPrize
        fields = ['student_id', 'picture_link', 'get_prize_date', 'prize_name']


# 个人中心生涯比赛序列化类
class CareerMatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CareerMatch
        exclude = ['match_id', ]


# 个人中心生涯执裁序列化类
class CareerRefereeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CareerReferee
        exclude = ['match_id', ]


# 个人中心生涯活动序列化类
class CareerActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CareerActivity
        fields = '__all__'


# 个人中心相册展示所有序列化类
class AlbumShowAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserAlbum
        fields = '__all__'


# 修改个人信息序列化类
class ChangeUserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = '__all__'
