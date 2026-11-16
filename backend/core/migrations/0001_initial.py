from django.db import migrations, models

class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [
        migrations.CreateModel(
            name='ContactInquiry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=120)),
                ('email', models.EmailField(max_length=254)),
                ('company', models.CharField(blank=True, max_length=160)),
                ('service', models.CharField(max_length=32)),
                ('message', models.TextField(max_length=5000)),
                ('status', models.CharField(choices=[('new', 'New'), ('in_progress', 'In progress'), ('answered', 'Answered'), ('closed', 'Closed')], db_index=True, default='new', max_length=20)),
                ('admin_notes', models.TextField(blank=True)),
                ('source_language', models.CharField(choices=[('en', 'English'), ('fa', 'Persian')], default='en', max_length=5)),
                ('ip_address', models.GenericIPAddressField(blank=True, null=True)),
            ],
            options={'ordering': ['-created_at']},
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('slug', models.SlugField(max_length=180, unique=True)),
                ('category', models.CharField(choices=[('web', 'Web Applications'), ('infrastructure', 'Server & Infrastructure'), ('custom', 'Custom Software'), ('support', 'Maintenance & Support')], max_length=32)),
                ('title', models.CharField(max_length=180)),
                ('title_fa', models.CharField(blank=True, max_length=180)),
                ('summary', models.TextField()),
                ('summary_fa', models.TextField(blank=True)),
                ('overview', models.TextField(blank=True)),
                ('overview_fa', models.TextField(blank=True)),
                ('highlights', models.JSONField(blank=True, default=list)),
                ('highlights_fa', models.JSONField(blank=True, default=list)),
                ('technologies', models.JSONField(blank=True, default=list)),
                ('is_featured', models.BooleanField(default=False)),
                ('is_demo', models.BooleanField(default=True)),
                ('is_published', models.BooleanField(default=True)),
                ('sort_order', models.PositiveSmallIntegerField(default=0)),
            ],
            options={'ordering': ['sort_order', '-created_at']},
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('category', models.CharField(choices=[('web', 'Web Applications'), ('infrastructure', 'Server & Infrastructure'), ('custom', 'Custom Software'), ('support', 'Maintenance & Support')], max_length=32, unique=True)),
                ('title', models.CharField(max_length=180)),
                ('title_fa', models.CharField(blank=True, max_length=180)),
                ('short_description', models.TextField()),
                ('short_description_fa', models.TextField(blank=True)),
                ('description', models.TextField(blank=True)),
                ('description_fa', models.TextField(blank=True)),
                ('features', models.JSONField(blank=True, default=list, help_text='List of feature strings')),
                ('features_fa', models.JSONField(blank=True, default=list, help_text='List of Persian feature strings')),
                ('sort_order', models.PositiveSmallIntegerField(default=0)),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={'ordering': ['sort_order', 'id']},
        ),
        migrations.AddIndex(
            model_name='project',
            index=models.Index(fields=['is_published', 'category'], name='core_project_pub_cat_idx'),
        ),
    ]
