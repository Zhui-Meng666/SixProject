from django.db import models


# 个人中心表结构
# 用户表
class User(models.Model):
    openid = models.CharField(verbose_name='开放码', primary_key=True, max_length=64, unique=True)
    student_id = models.CharField(verbose_name='学号', max_length=10, unique=True)
    avatar = models.CharField(verbose_name='头像', max_length=128, null=True)
    nickname = models.CharField(verbose_name='昵称', max_length=32, null=True)
    gender = models.CharField(verbose_name='性别', max_length=16, null=True)
    introduction = models.TextField(verbose_name='个人简介', default='这个人很神秘，什么都没有~')
    objects = models.Manager()


# 用户身份表
class UserIdentity(models.Model):
    student_id = models.CharField(verbose_name='学号', max_length=10, unique=True)
    identity = models.CharField(verbose_name='身份', max_length=8, null=True)
    objects = models.Manager()


# 用户信息表
class UserInfo(models.Model):
    student_id = models.CharField(verbose_name='学号', primary_key=True, max_length=10, unique=True)
    sufe_currency = models.IntegerField(verbose_name='sufe币', default=0)
    experience = models.IntegerField(verbose_name='经验值', default=0)
    back_picture = models.CharField(verbose_name='背景图片', max_length=128, default='default')
    grade = models.IntegerField(verbose_name='用户等级', default=1)
    objects = models.Manager()


# 用户相册表
class UserAlbum(models.Model):
    student_id = models.CharField(verbose_name='学号', max_length=10, unique=True)
    picture_link = models.CharField(verbose_name='照片链接', max_length=128, null=True)
    objects = models.Manager()


# 个人中心裁判表
class UserReferee(models.Model):
    student_id = models.CharField(verbose_name='学号', primary_key=True, max_length=10, unique=True)
    experience = models.IntegerField(verbose_name='裁判经验值', default=0)
    grade = models.IntegerField(verbose_name='裁判等级', default=0)
    credit_score = models.IntegerField(verbose_name='信誉分', default=100)
    objects = models.Manager()


# 个人中心收藏表
class UserCollection(models.Model):
    student_id = models.CharField(verbose_name='学号', max_length=10, unique=True)
    video_link = models.CharField(verbose_name='收藏视频链接', max_length=128)
    video_introduction = models.TextField(verbose_name='收藏视频简介')
    video_title = models.CharField(verbose_name='视频标题', max_length=32)
    video_like_num = models.IntegerField(verbose_name='视频点赞数', default=0)
    video_cover_link = models.CharField(verbose_name='视频封面链接', max_length=128)
    objects = models.Manager()


# 个人中心奖品表
class UserPrize(models.Model):
    student_id = models.CharField(verbose_name='学号', max_length=10, unique=True)
    picture_link = models.CharField(verbose_name='图片链接', max_length=128)
    prize_exchange_id = models.CharField(verbose_name='奖品兑换编码', max_length=128, unique=True)
    get_prize_date = models.CharField(verbose_name='获奖日期', max_length=64)
    prize_name = models.CharField(verbose_name='奖品名称', max_length=64)
    objects = models.Manager()


# 奖品展示表
class Prize(models.Model):
    id = models.IntegerField(verbose_name='奖品id', primary_key=True)
    picture_link = models.CharField(verbose_name='图片链接', max_length=128)
    prize_name = models.CharField(verbose_name='奖品名称', max_length=64)
    detailed_info = models.TextField(verbose_name='奖品详细信息')
    sufe_currency = models.IntegerField(verbose_name='需要sufe币数量')
    address = models.CharField(verbose_name='兑换地点', max_length=128)
    objects = models.Manager()


# 生涯比赛表
class CareerMatch(models.Model):
    student_id = models.CharField(verbose_name='学号', max_length=10, unique=True)
    match_id = models.IntegerField(verbose_name='比赛编号')
    match_name = models.CharField(verbose_name='比赛名称', max_length=16)
    match_rank = models.IntegerField(verbose_name='比赛名次', default=0)
    match_date = models.CharField(verbose_name='比赛日期', max_length=64)
    objects = models.Manager()


# 生涯执裁表
class CareerReferee(models.Model):
    student_id = models.CharField(verbose_name='学号', max_length=10, unique=True)
    match_id = models.IntegerField(verbose_name='比赛编号')
    match_name = models.CharField(verbose_name='比赛名称', max_length=16)
    referee_date = models.CharField(verbose_name='执裁日期', max_length=64)
    objects = models.Manager()


# 生涯活动表
class CareerActivity(models.Model):
    student_id = models.CharField(verbose_name='学号', max_length=10, unique=True)
    ac_name = models.CharField(verbose_name='活动名称', max_length=16)
    ac_date = models.CharField(verbose_name='活动日期', max_length=64)
    objects = models.Manager()


