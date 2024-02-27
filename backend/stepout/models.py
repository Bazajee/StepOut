# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Images(models.Model):
    id = models.TextField(unique=True)
    url = models.TextField()
    author = models.TextField()
    source = models.TextField(blank=True, null=True)
    description = models.TextField()
    name = models.TextField()

    class Meta:
        managed = False
        db_table = 'Images'


class Monument(models.Model):
    id = models.TextField(unique=True)
    is_main = models.BooleanField()
    name = models.TextField()
    description = models.TextField()
    author = models.TextField()
    period = models.TextField()
    poi = models.OneToOneField('Poi', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Monument'


class MonumentImages(models.Model):
    id = models.TextField(unique=True)
    image = models.OneToOneField(Images, models.DO_NOTHING)
    monument = models.ForeignKey(Monument, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Monument_images'


class Poi(models.Model):
    id = models.TextField(unique=True)
    adresse_forme_editoriale = models.TextField()
    commune = models.TextField()
    code_insee = models.IntegerField()
    position = models.JSONField()
    monument_id = models.TextField()

    class Meta:
        managed = False
        db_table = 'Poi'


class User(models.Model):
    email = models.TextField(unique=True)
    passwordhash = models.TextField(db_column='passwordHash')  # Field name made lowercase.
    name = models.TextField()
    firstname = models.TextField(db_column='firstName')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'User'
