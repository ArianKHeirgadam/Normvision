from django.core.management.base import BaseCommand
from core.models import Project, Service

SERVICES = [
 ('web','Web Application Development','توسعه اپلیکیشن وب','Scalable, responsive, and intuitive web applications designed around your business requirements.','اپلیکیشن‌های وب مقیاس‌پذیر، واکنش‌گرا و ساده برای استفاده، متناسب با نیازهای کسب‌وکار شما.'),
 ('infrastructure','Server & Infrastructure','سرور و زیرساخت','Reliable infrastructure management, server administration, monitoring, and maintenance.','مدیریت زیرساخت قابل اعتماد، راهبری سرور، پایش و نگهداری.'),
 ('custom','Custom Software Development','توسعه نرم‌افزار اختصاصی','Purpose-built software solutions that simplify complex workflows and business operations.','راهکارهای نرم‌افزاری اختصاصی برای ساده‌سازی گردش‌کارهای پیچیده و عملیات کسب‌وکار.'),
 ('support','Maintenance & Technical Support','نگهداری و پشتیبانی فنی','Continuous technical support, system optimization, and long-term software maintenance.','پشتیبانی فنی مستمر، بهینه‌سازی سامانه و نگهداری بلندمدت نرم‌افزار.'),
]
SERVICE_FEATURES = {
 'web': (['Custom Web Applications','Enterprise Platforms','SaaS Development','Responsive Web Experiences','API Development & Integration','Dashboard & Admin Systems'], ['اپلیکیشن‌های وب اختصاصی','پلتفرم‌های سازمانی','توسعه SaaS','تجربه‌های وب واکنش‌گرا','توسعه و یکپارچه‌سازی API','داشبورد و پنل مدیریت']),
 'infrastructure': (['Server Setup & Configuration','Server Administration','Infrastructure Monitoring','Performance Optimization','Security & Maintenance','Deployment Management'], ['راه‌اندازی و پیکربندی سرور','مدیریت سرور','پایش زیرساخت','بهینه‌سازی عملکرد','امنیت و نگهداری','مدیریت استقرار']),
 'custom': (['Business Management Systems','Custom Enterprise Software','Workflow Automation','Database Solutions','Internal Business Applications','Software Integration'], ['سامانه‌های مدیریت کسب‌وکار','نرم‌افزار سازمانی اختصاصی','خودکارسازی گردش‌کار','راهکارهای پایگاه داده','اپلیکیشن‌های داخلی کسب‌وکار','یکپارچه‌سازی نرم‌افزار']),
 'support': (['Application Maintenance','Technical Troubleshooting','Bug Fixing','Performance Improvements','System Updates','Ongoing Technical Support'], ['نگهداری اپلیکیشن','عیب‌یابی فنی','رفع اشکال','بهبود عملکرد','به‌روزرسانی سامانه','پشتیبانی فنی مستمر']),
}
PROJECTS = [
 ('operations-dashboard','web','Business Operations Dashboard','داشبورد عملیات کسب‌وکار','A concept for a web dashboard that brings key operational data into one clear, role-based view.','نمونه‌ای از داشبورد وب برای نمایش یکپارچه داده‌های کلیدی عملیات.' ,'This demo concept shows how a business could replace scattered spreadsheets with a single web dashboard.','این نمونه نمایشی نشان می‌دهد چگونه کسب‌وکار می‌تواند فایل‌های پراکنده را با یک داشبورد وب جایگزین کند.', ['Role-based views for different teams','Clear summary cards and trend charts','Admin area for managing users and settings'], ['نمای مبتنی بر نقش برای تیم‌های مختلف','کارت‌های خلاصه و نمودارهای روند','بخش مدیریت کاربران و تنظیمات'], ['ASP.NET Core','C#','SQL Server','JavaScript'], True),
 ('customer-portal','web','Customer Self-Service Portal','پرتال خودخدمت مشتریان','A concept for a secure portal where customers manage requests and view their account information.','نمونه‌ای از پرتال امن برای مدیریت درخواست‌ها و مشاهده اطلاعات حساب مشتریان.','This demo concept explores a customer-facing web application: sign-in, request tracking, and account pages.','این نمونه نمایشی یک اپلیکیشن وب مشتری‌محور برای ورود، پیگیری درخواست‌ها و مشاهده حساب را بررسی می‌کند.',['Account area with request history','Accessible forms and clear status messages','Mobile-friendly interface'],['بخش حساب کاربری همراه با تاریخچه درخواست‌ها','فرم‌های دسترس‌پذیر و پیام‌های وضعیت شفاف','رابط سازگار با موبایل'],['ASP.NET Core','HTML5','CSS3','JavaScript'],False),
 ('server-monitoring','infrastructure','Server Monitoring Overview','نمای کلی پایش سرورها','A concept for monitoring server health, so issues are visible before they affect users.','نمونه‌ای برای پایش سلامت سرورها و شناسایی زودهنگام مشکلات.','This demo concept illustrates infrastructure monitoring: server status, resource usage, and alerts.','این نمونه نمایشی پایش زیرساخت، وضعیت سرورها، مصرف منابع و هشدارها را نشان می‌دهد.',['Status overview of servers and services','Resource and performance indicators','Alert rules and maintenance notes'],['نمای وضعیت سرورها و سرویس‌ها','شاخص‌های منابع و عملکرد','قواعد هشدار و یادداشت‌های نگهداری'],['Docker','Cloud Infrastructure'],True),
 ('deployment-workflow','infrastructure','Managed Deployment Workflow','گردش‌کار استقرار مدیریت‌شده','A concept for repeatable, containerized deployments with a clear path from build to production.','نمونه‌ای از استقرارهای کانتینری تکرارپذیر با مسیر روشن از ساخت تا انتشار.','This demo concept outlines a consistent deployment process using containers and documented releases.','این نمونه نمایشی فرایند استقرار منسجم با استفاده از کانتینرها و انتشار مستند را ترسیم می‌کند.',['Containerized application builds','Consistent environments from test to production','Documented release and rollback steps'],['ساخت نسخه‌های کانتینری اپلیکیشن','محیط‌های یکسان از آزمون تا انتشار','مراحل مستند انتشار و بازگشت نسخه'],['Docker','Cloud Infrastructure','ASP.NET Core'],False),
 ('workflow-automation','custom','Workflow Automation Suite','مجموعه خودکارسازی گردش‌کار','A concept for software that turns a manual, multi-step business process into a guided digital workflow.','نمونه‌ای از نرم‌افزاری برای تبدیل فرایندهای دستی چندمرحله‌ای به گردش‌کار دیجیتال.','This demo concept shows how a repetitive internal process could become a structured application.','این نمونه نمایشی نشان می‌دهد چگونه یک فرایند داخلی تکراری به اپلیکیشنی ساختاریافته تبدیل می‌شود.',['Step-by-step task and approval flow','Central database of records','Notifications for pending work'],['گردش مرحله‌ای وظایف و تأییدها','پایگاه داده مرکزی سوابق','اعلان برای کارهای در انتظار'],['C#','SQL Server','ASP.NET Core'],True),
 ('support-workflow','support','Maintenance & Support Workflow','گردش‌کار نگهداری و پشتیبانی','A concept for tracking issues, updates, and improvements across a live application.','نمونه‌ای برای پیگیری مشکلات، به‌روزرسانی‌ها و بهبودهای اپلیکیشن.','This demo concept illustrates how ongoing maintenance can be organized.','این نمونه نمایشی روشی برای سازمان‌دهی نگهداری مستمر نرم‌افزار ارائه می‌دهد.',['Issue intake with priority levels','Change history for every fix and update','Performance improvement tracking'],['ثبت مسئله همراه با سطح اولویت','تاریخچه تغییرات هر اصلاح و به‌روزرسانی','پیگیری بهبود عملکرد'],['C#','SQL Server','JavaScript'],False),
]

class Command(BaseCommand):
    help = 'Create the initial nORMvis services and demo projects (safe to run repeatedly).'
    def handle(self, *args, **options):
        for i, row in enumerate(SERVICES):
            category,title,title_fa,desc,desc_fa = row
            Service.objects.update_or_create(category=category, defaults={
                'title':title, 'title_fa':title_fa, 'short_description':desc,
                'short_description_fa':desc_fa, 'features':SERVICE_FEATURES[category][0],
                'features_fa':SERVICE_FEATURES[category][1], 'sort_order':i, 'is_active':True,
            })
        for i, row in enumerate(PROJECTS):
            slug,category,title,title_fa,summary,summary_fa,overview,overview_fa,highlights,highlights_fa,technologies,featured = row
            Project.objects.update_or_create(slug=slug, defaults={
                'category':category,'title':title,'title_fa':title_fa,'summary':summary,
                'summary_fa':summary_fa,'overview':overview,'overview_fa':overview_fa,
                'highlights':highlights,'highlights_fa':highlights_fa,'technologies':technologies,
                'is_featured':featured,'is_demo':True,'is_published':True,'sort_order':i,
            })
        self.stdout.write(self.style.SUCCESS('nORMvis demo content created/updated.'))
