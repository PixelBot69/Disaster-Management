from django.db import models
from django.contrib.auth.models import User

class Report(models.Model):
    REPORT_TYPES = (
        ('FLOOD', 'Flood'),
        ('ROAD', 'Road Blockage'),
        ('DAMAGE', 'Damage'),
        ('OTHER', 'Other'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)  # Increased max_length for name
    location = models.CharField(max_length=255)  # Added location field
    report_type = models.CharField(max_length=10, choices=REPORT_TYPES)
    description = models.TextField()
    contact = models.CharField(max_length=15, default='0000000000')

    def __str__(self):
        return f"{self.get_report_type_display()} at {self.location}"



class DisasterProtocol(models.Model):
    REPORT_TYPES = (
        ('FLOOD', 'Flood'),
        ('ROAD', 'Road Blockage'),
        ('DAMAGE', 'Damage'),
        ('OTHER', 'Other'),
    )

    report_type = models.CharField(max_length=10, choices=REPORT_TYPES)
    protocol = models.TextField() 

    def __str__(self):
        return f"Protocol for {self.get_report_type_display()}"

class BloodDonationRequest(models.Model):
    BLOOD_TYPES = (
        ('A+', 'A+'),
        ('A-', 'A-'),
        ('B+', 'B+'),
        ('B-', 'B-'),
        ('O+', 'O+'),
        ('O-', 'O-'),
        ('AB+', 'AB+'),
        ('AB-', 'AB-'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    phone_number = models.CharField(max_length=15)
    blood_type = models.CharField(max_length=3, choices=BLOOD_TYPES)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='PENDING')

    def __str__(self):
        return f"Blood Request for {self.name} ({self.blood_type})"
    
