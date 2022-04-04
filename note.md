# Part 1
  1. 
- creat a 'mysite' using 
```django
$ django-admin startpaojrct mysite
```
-  To create your app
```
python manage.py startapp yourAppName 
```
2.  runserver: 
```python
$ python manage.py runserver
```
3. view(basic): 
   
```
from django.http import HttpResponse
    def index()
        return HttpResponse('content')
```

# Part 2
1. settings.py:INSTALLED_APPS


- **django.contrib.admin** – The admin site. You’ll use it shortly.
- **django.contrib.auth** – An authentication system.
- **django.contrib.contenttypes** – A framework for content types.
- **django.contrib.sessions** – A session framework.
- **django.contrib.messages** – A messaging framework.
- **django.contrib.staticfiles** – A framework for managing static files.

1. Field Class

- ```CharField ```=> varchar
- ```DateTimeField``` => Datetime 
- `IntegerField(default=0)` => int
  
eg:
```
class Question(models.Model):
        question_text = models.CharField(max_length=200)
        pub_date = models.DateTimeField('date published')
```
  
3. Migration (From Django model to database)

3.1. Run `$ python manage.py makemigrations yourAppName` to create migrations for those changes
   
3.2. Run `$ python manage.py sqlmigrate yourAppName 0001` command shows the converted SQL from Django models:

3.3. Run `$ python manage.py migrate` to apply those changes to create those model tables in your database:
 
---

4. Playing with API to access your database in python shell: 
```
$ python manage.py shell
```
- It’s important to add __str__() methods to your models
eg: 
```
 def __str__(self):
        return self.choice_text
```

- q.choice_set.all() => select* from table
- q.choice_set.count() => select count(*) from table
- q.choice_set.filter(choice_text__startswith='Just hacking') => select* from table where choice_text like 'Just hacking%'


# Part 3 how urls.py/views.py/template collabrate
1. url Pattern example: ` /newsarchive/<year>/<month>/ `.
2.  Writting appName.urls (basic)
```py
from django.urls import path
from .import views

urlpatterns = [
# eg: /appName/
path('', view.index, name = 'index'),
 # eg: /appName/int(argName)/
path('<int:argName>/', views.functionName, name='functionName'),
...
] 
```

3. views without render/template


3.1 Writting views.py (basic):
```py
from django.http import HttpResponse

def functionName(request, argName):
    return HttpResponse('content')
#similar like print
```

3.2 Write views that actually doing something:

eg: an index() view:
```py
def index(request):
    
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    output = ', '.join([q.question_text for q in latest_question_list])
    return HttpResponse(output)

```

4. views with render/template


4.1. Template: TEMPLATES setting describes how Django will load and render templates.


4.2. put template in view:

eg:
```py
from django.http import HttpResponse
from django.template import loader
from .models import Question

def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    template = loader.get_template('appName/index.html')
    # add template
    context = {
        'latest_question_list': latest_question_list,
    }
    return HttpResponse(template.render(context, request))
```
That code loads the template called polls/templates/polls/index.html and passes it a context.


4.3. Shortcut: render():
eg:
```py
from django.shortcuts import render
from .models import Question

def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    context = {
        'latest_question_list': latest_question_list,
    }
    return render(request, 'appName/index.html', context)
```
4.4. 404 error:

eg:
```py
from django.http import Http404
from django.shortcuts import render
from .models import Question

def detail(request, argName):
#...
    try:
        question = Question.objects.get(pk=question_id)
    except Question.DoesNotExist:
        raise Http404("Question does not exist")
    return render(request, 'polls/detail.html', {'question': question})
```
**Shortcut for 404 :**


```py
from django.shortcuts import get_object_or_404, render

from .models import Question
# ...
def detail(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    return render(request, 'polls/detail.html', {'question': question})
```
An example of Django template:
```py
{% for choice in question.choice_set.all %}
    <li>{{ choice.choice_text }}</li>
{% endfor %}
```

5. URLs in templates and urls.py:
```py
# eg 1:
<li><a href="/polls/{{ question.id }}/">{{ question.question_text }}</a></li>
# eg 1 version 2:
<li><a href="{% url 'detail' question.id %}">{{ question.question_text }}</a></li>

```

in urls.py, for example, we have:
```py
from django.urls import path

from . import views

app_name = 'polls'
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:question_id>/', views.detail, name='detail'),
]
```
if there are more than one apps in our code, we may add appName:functionName, for example, if there are only one app, we can write as: 

`<li><a href="{% url 'detail' question.id %}">{{ question.question_text }}</a></li>`  in index.html.
If there are more than one apps, we should write:

`<li><a href="{% url 'appName: detail' question.id %}">{{ question.question_text }}</a></li>`.

# Part 4 : 

1. Write a minimal form:

`<form action="{% url 'polls:vote' question.id %}" method="post">` is writing a form with listener (submit the form content to action="destination").

- request.POST values are always string.
- HttpResponseRedirect 
- reverse( ) in HttpResponseRedirect 

2. User generic views:
using :
```
from django.views import generic

class IndexView(generuc.ListView)
```



if error_message is not null:
    <p><strong>error</strong></p>

# if question 1 has 3 choices
<input type="radio" name="choice" id="choice1" value="1">
<input type="radio" name="choice" id="choice2" value="2">
<input type="radio" name="choice" id="choice3" value="3">


# if question 2 has 5 choices
<input type="radio" name="choice" id="choice1" value="1">
<input type="radio" name="choice" id="choice2" value="2">
<input type="radio" name="choice" id="choice3" value="3">
<input type="radio" name="choice" id="choice4" value="4">
<input type="radio" name="choice" id="choice5" value="5">