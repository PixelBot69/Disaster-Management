from django.contrib import admin
from .models import Report, DisasterProtocol,BloodDonationRequest

class ReportAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'report_type', 'contact', 'location')  # Added 'location'
    list_filter = ('report_type',)
    search_fields = ('name', 'description', 'contact', 'user__username')
    ordering = ('-id',)

class ChatRoomAdmin(admin.ModelAdmin):
    list_display = ('user', 'admin', 'created_at')
    search_fields = ('user__username', 'admin__username')


class MessageAdmin(admin.ModelAdmin):
    list_display = ('chat_room', 'sender', 'text', 'sent_at')
    search_fields = ('sender__username', 'text')
    list_filter = ('sent_at',)

class DisasterProtocolAdmin(admin.ModelAdmin):
    list_display = ('report_type',) 
    search_fields = ('report_type',)  


class BloodDonationRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'age', 'blood_type', 'phone_number', 'status', 'created_at')
    search_fields = ('name', 'phone_number', 'blood_type')
    list_filter = ('blood_type', 'status', 'created_at')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)

admin.site.register(Report, ReportAdmin)
admin.site.register(DisasterProtocol, DisasterProtocolAdmin)

admin.site.register(BloodDonationRequest, BloodDonationRequestAdmin)



