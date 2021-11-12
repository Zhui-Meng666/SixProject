from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.response import Response
from app import models
from app.serializer import personal_center_serializer
from rest_framework.throttling import AnonRateThrottle
from rest_framework.pagination import PageNumberPagination
from rest_framework import status


# 注册接口
class RegisterView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = [AnonRateThrottle, ]

    def post(self, request, *args, **kwargs):
        result = {'data': None, 'status': None, 'errors': None}
        ser = personal_center_serializer.RegisterSerializer(data=request.data)
        if ser.is_valid():
            ser.save()
            models.UserInfo.objects.create(student_id=ser.data['student_id'])
            result['data'] = ser.data
            result['status'] = status.HTTP_200_OK
            return Response(result)
        result['errors'] = ser.errors
        result['status'] = status.HTTP_400_BAD_REQUEST
        return Response(result)


# 修改身份接口
class ChangeIdentityView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = [AnonRateThrottle, ]

    def post(self, request, *args, **kwargs):
        result = {'data': None, 'status': None, 'errors': None}
        data = []
        student_id_queryset = models.User.objects.filter(openid=request.data.get('openid')).values('student_id')
        student_id_dict = list(student_id_queryset)[0]
        student_id = student_id_dict['student_id']
        models.UserIdentity.objects.filter(student_id=student_id).delete()
        identity_list = request.data.get('identity')
        for identity in identity_list:
            data.append({"student_id": student_id, "identity": identity})
        ser = personal_center_serializer.ChangeIdentitySerializer(data=data, many=True)
        if ser.is_valid():
            ser.save()
            result['data'] = ser.data
            result['status'] = status.HTTP_200_OK
            return Response(result)
        result['errors'] = ser.errors
        result['status'] = status.HTTP_400_BAD_REQUEST
        return Response(result)


# 修改背景图片接口
class ChangeBackPictureView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = [AnonRateThrottle, ]

    def post(self, request, *args, **kwargs):
        result = {'data': None, 'status': None, 'errors': None}
        student_id_queryset = models.User.objects.filter(openid=request.data.get('openid')).values('student_id')
        student_id_dict = list(student_id_queryset)[0]
        student_id = student_id_dict['student_id']
        user_queryset = models.UserInfo.objects.filter(student_id=student_id).first()
        data = {'student_id': student_id, 'back_picture': request.data.get('back_picture')}
        ser = personal_center_serializer.ChangeBackPictureSerializer(instance=user_queryset, data=data, partial=True)
        if ser.is_valid():
            ser.save()
            result['data'] = ser.data
            result['status'] = status.HTTP_200_OK
            return Response(result)
        result['errors'] = ser.errors
        result['status'] = status.HTTP_400_BAD_REQUEST
        return Response(result)


# 个人展示接口
class UserShowView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = [AnonRateThrottle, ]

    def get(self, request, *args, **kwargs):
        result = {'data': None, 'status': None, 'errors': None}
        student_id_queryset = models.User.objects.filter(openid=request.query_params.get('openid')).values('student_id')
        student_id_dict = list(student_id_queryset)[0]
        student_id = student_id_dict['student_id']
        queryset_user = models.User.objects.filter(openid=request.query_params.get('openid')).values('student_id', 'gender, introduction').first()
        queryset_user_info = models.UserInfo.objects.filter(student_id=student_id).first()
        queryset_identity = models.UserIdentity.objects.filter(student_id=student_id)
        queryset_album = models.UserAlbum.objects.filter(student_id=student_id)
        ser_user = personal_center_serializer.UserShowSerializer(instance=queryset_user)
        ser_user_info = personal_center_serializer.UserShowInfoSerializer(instance=queryset_user_info)
        ser_identity = personal_center_serializer.UserShowIdentitySerializer(instance=queryset_identity, many=True)
        ser_album = personal_center_serializer.UserShowAlbumSerializer(instance=queryset_album, many=True)
        if ser_user.is_valid() and ser_user_info.is_valid() and ser_identity.is_valid() and ser_album.is_valid():
            data = {**ser_user.data, **ser_user_info.data}
            ident = []
            alb = []
            count = 0
            for identity in ser_identity.data:
                ident.append(identity['identity'])
            for album in ser_album.data:
                if count == 3:
                    break
                else:
                    alb.append(album['album'])
                    count += 1
            data['identity'] = ident
            data['album'] = alb
            result['data'] = data
            result['status'] = status.HTTP_200_OK
            return Response(result)
        result['errors'] = [ser_user.errors, ser_user_info.errors, ser_identity.errors, ser_album.errors]
        result['status'] = status.HTTP_400_BAD_REQUEST
        return Response(result)


# 个人中心收藏接口
class UserCollectionView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = [AnonRateThrottle, ]

    def get(self, request, *args, **kwargs):
        result = {'data': None, 'status': None, 'errors': None}
        student_id_queryset = models.User.objects.filter(openid=request.query_params.get('openid')).values('student_id')
        student_id_dict = list(student_id_queryset)[0]
        student_id = student_id_dict['student_id']
        queryset_collection = models.UserCollection.objects.filter(student_id=student_id)
        ser = personal_center_serializer.UserCollectionSerializer(instance=queryset_collection, many=True)
        if ser.is_valid():
            data = {'student_id': student_id}
            video_link = []
            video_title = []
            video_cover_link = []
            for video in ser.data:
                video_link.append(video['video_link'])
                video_title.append(video['video_title'])
                video_cover_link.append(video['video_cover_link'])
            data['video'] = {
                'video_link': video_link,
                'video_title': video_title,
                'video_cover_link': video_cover_link
            }
            result['data'] = data
            result['status'] = status.HTTP_200_OK
            return Response(result)
        result['errors'] = ser.errors
        result['status'] = status.HTTP_400_BAD_REQUEST
        return Response(result)


# 个人中心奖品接口
class UserPrizeView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = [AnonRateThrottle, ]

    def get(self, request, *args, **kwargs):
        result = {'data': None, 'status': None, 'errors': None}
        student_id_queryset = models.User.objects.filter(openid=request.query_params.get('openid')).values('student_id')
        student_id_dict = list(student_id_queryset)[0]
        student_id = student_id_dict['student_id']
        queryset_prize = models.UserPrize.objects.filter(student_id=student_id)
        ser = personal_center_serializer.UserPrizeSerializer(instance=queryset_prize, many=True)
        if ser.is_valid():
            picture_link = []
            date = []
            name = []
            for prize in ser.data:
                picture_link.append(prize['picture_link'])
                date.append(prize['get_prize_date'])
                name.append(prize['prize_name'])
            data = {
                'student_id': student_id,
                'picture_link': picture_link,
                'date': date,
                'name': name
            }
            result['data'] = data
            result['status'] = status.HTTP_200_OK
            return Response(result)
        result['errors'] = ser.errors
        result['status'] = status.HTTP_400_BAD_REQUEST
        return Response(result)


# 生涯的比赛接口
class CareerMatchView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = [AnonRateThrottle, ]

    def get(self, request, *args, **kwargs):
        result = {'data': None, 'status': None, 'errors': None}
        student_id_queryset = models.User.objects.filter(openid=request.query_params.get('openid')).values('student_id')
        student_id_dict = list(student_id_queryset)[0]
        student_id = student_id_dict['student_id']
        queryset_match = models.CareerMatch.objects.filter(student_id=student_id)
        ser = personal_center_serializer.CareerMatchSerializer(instance=queryset_match, many=True)
        if ser.is_valid():
            name = []
            rank = []
            date = []
            for match in ser.data:
                name.append(match['match_name'])
                rank.append(match['match_rank'])
                date.append(match['match_date'])
            data = {
                'student_id': student_id,
                'name': name,
                'rank': rank,
                'date': date
            }
            result['data'] = data
            result['status'] = status.HTTP_200_OK
            return Response(result)
        result['errors'] = ser.errors
        result['status'] = status.HTTP_400_BAD_REQUEST
        return Response(result)


# 生涯的执裁接口
class CareerRefereeView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = [AnonRateThrottle, ]

    def get(self, request, *args, **kwargs):
        result = {'data': None, 'status': None, 'errors': None}
        student_id_queryset = models.User.objects.filter(openid=request.query_params.get('openid')).values('student_id')
        student_id_dict = list(student_id_queryset)[0]
        student_id = student_id_dict['student_id']
        queryset_referee = models.CareerReferee.objects.filter(student_id=student_id)
        ser = personal_center_serializer.CareerRefereeSerializer(instance=queryset_referee, many=True)
        if ser.is_valid():
            name = []
            referee_date = []
            for referee in ser.data:
                name.append(referee['match_name'])
                referee_date.append(referee['referee_date'])
            data = {
                'student_id': student_id,
                'name': name,
                'referee_date': referee_date
            }
            result['data'] = data
            result['status'] = status.HTTP_200_OK
            return Response(result)
        result['errors'] = ser.errors
        result['status'] = status.HTTP_400_BAD_REQUEST
        return Response(result)


# 生涯的活动接口
class CareerActivityView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = [AnonRateThrottle, ]

    def get(self, request, *args, **kwargs):
        result = {'data': None, 'status': None, 'errors': None}
        student_id_queryset = models.User.objects.filter(openid=request.query_params.get('openid')).values('student_id')
        student_id_dict = list(student_id_queryset)[0]
        student_id = student_id_dict['student_id']
        queryset_ac = models.CareerActivity.objects.filter(student_id=student_id)
        ser = personal_center_serializer.CareerActivitySerializer(instance=queryset_ac, many=True)
        if ser.is_valid():
            name = []
            date = []
            for activity in ser.data:
                name.append(activity['ac_name'])
                date.append(activity['ac_date'])
            data = {
                'student_id': student_id,
                'name': name,
                'date': date
            }
            result['data'] = data
            result['status'] = status.HTTP_200_OK
            return Response(result)
        result['errors'] = ser.errors
        result['status'] = status.HTTP_400_BAD_REQUEST
        return Response(result)


# 相册展示所有接口
class AlbumShowAllView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = [AnonRateThrottle, ]

    def get(self, request, *args, **kwargs):
        result = {'data': None, 'status': None, 'errors': None}
        student_id_queryset = models.User.objects.filter(openid=request.query_params.get('openid')).values('student_id')
        student_id_dict = list(student_id_queryset)[0]
        student_id = student_id_dict['student_id']
        queryset_album = models.UserAlbum.objects.filter(student_id=student_id)
        ser = personal_center_serializer.AlbumShowAllSerializer(instance=queryset_album, many=True)
        if ser.is_valid():
            picture_link = []
            for picture in ser.data:
                picture_link.append(picture['picture_link'])
            data = {
                'student_id': student_id,
                'picture_link': picture_link
            }
            result['data'] = data
            result['status'] = status.HTTP_200_OK
            return Response(result)
        result['errors'] = ser.errors
        result['status'] = status.HTTP_400_BAD_REQUEST
        return Response(result)


# 相册上传接口
class AlbumUploadView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = [AnonRateThrottle, ]

    def post(self, request, *args, **kwargs):
        result = {'data': None, 'status': None, 'errors': None}
        student_id_queryset = models.User.objects.filter(openid=request.data.get('openid')).values('student_id')
        student_id_dict = list(student_id_queryset)[0]
        student_id = student_id_dict['student_id']
        pl = []
        for picture_link in request.data.get('picture_link'):
            ser = personal_center_serializer.AlbumShowAllSerializer(data={'student_id': student_id, 'picture_link': picture_link})
            if not ser.is_valid():
                result['errors'] = ser.errors
                result['status'] = status.HTTP_400_BAD_REQUEST
                return Response(result)
            ser.save()
            pl.append(ser.data['picture_link'])
        data = {
            'student_id': student_id,
            'picture_link': pl
        }
        result['data'] = data
        result['status'] = status.HTTP_200_OK
        return Response(result)

    def delete(self, request, *args, **kwargs):
        result = {'data': None, 'status': None, 'errors': None}
        student_id_queryset = models.User.objects.filter(openid=request.data.get('openid')).values('student_id')
        student_id_dict = list(student_id_queryset)[0]
        student_id = student_id_dict['student_id']
        for picture_link in request.data.get('picture_link'):
            models.UserAlbum.objects.filter(student_id=student_id, picture_link=picture_link).delete()
        data = {
            'student_id': student_id,
            'picture_link': request.data.get('picture_link')
        }
        result['data'] = data
        result['status'] = status.HTTP_200_OK
        return Response(result)


# 修改个人信息接口
class ChangeUserInfoView(APIView):
    authentication_classes = []
    permission_classes = []
    throttle_classes = [AnonRateThrottle, ]

    def post(self, request, *args, **kwargs):
        result = {'data': None, 'status': None, 'errors': None}
        queryset = models.User.objects.filter(openid=request.data.get('openid')).first()
        ser = personal_center_serializer.ChangeUserInfoSerializer(instance=queryset, data=request.data, partial=True)
        if ser.is_valid():
            ser.save()
            result['data'] = ser.data
            result['status'] = status.HTTP_200_OK
            return Response(result)
        result['errors'] = ser.errors
        result['status'] = status.HTTP_400_BAD_REQUEST
        return Response(result)
