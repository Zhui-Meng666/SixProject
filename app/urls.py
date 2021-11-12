from django.conf.urls import url
from app.views import personal_center

urlpatterns = [
    url(r'^change_back_picture/$', personal_center.ChangeBackPictureView.as_view()),
    url(r'^change_identity/$', personal_center.ChangeIdentityView.as_view()),
    url(r'change_user_info/$', personal_center.ChangeUserInfoView.as_view()),
    url(r'^register/$', personal_center.RegisterView.as_view()),  # 对
    url(r'^user_show/$', personal_center.UserShowView.as_view()),
    url(r'^user_collection/$', personal_center.UserCollectionView.as_view()),
    url(r'^user_prize/$', personal_center.UserPrizeView.as_view()),
    url(r'^career_match/$', personal_center.CareerMatchView.as_view()),
    url(r'^career_referee$', personal_center.CareerRefereeView.as_view()),
    url(r'^career_activity/$', personal_center.CareerActivityView.as_view()),
    url(r'^album_show_all/$', personal_center.AlbumShowAllView.as_view()),
    url(r'^album_upload/$', personal_center.AlbumUploadView.as_view())
]
