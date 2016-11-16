# ng2-tour-of-heroes-refactored
I started learning AngularJS three years ago when i started as a frontend developer
for the product [Relution](http://relution.io). When i started, the product was relatively new
and i could enter almost uncharted waters. The codebase of the application was 
obviously growing over time and soon we had to deal with decisions that we took in early stages.
As it is a product we could not start from scratch but we had to refactor our codebase to
keep it scalable for the future. Some of the refactorings had a bigger impact and could not be
done in a day. As there was the request for new features some of the refactorings had to be done
in parallel. This was sometimes a hard task to do so.

Anyway, as Google decided to develop the version AngularJS 2 and to make it not backwards compatible to 
Angular 1, i had to face the truth that i had to start from the beginning (again).
Besides all the new stuff that the AngularJS team has thrown into the boat like
TypeScript, Observables and of course AngularJS itself, some of things started looking familiar.

I started with the official [AngularJS tutorial](https://angular.io/docs/ts/latest/tutorial/). When i
had finished it, i decided to apply the lessons that i have learned with angular 1.
So i'm going to refactor the codebase.

## To follow along:
```
git clone git@github.com:Zarlex/ng2-tour-of-heroes-refactored.git
git checkout tags/1-tour-of-heroes
```
This will checkout out the revision how it has looked like after i finished the tutorial


## Run it
```
npm install
npm start
```

## Step 1—File Structure
I don't think that it is a good idea to have all the files in one folder.
Scrolling through a big file list makes it really hard to find the file
you are looking for.
Having to many subfolders will also slow down your development speed 
because you have to click through the whole folder structure when you want
to navigate to a file.
Finding the right file structure is not easy especially in a team where
every one has different preferences. 
We decided to follow the 
[John Papa Styleguide](https://angular.io/docs/ts/latest/guide/style-guide.html#!#app-structure-and-angular-modules) 
and adjust it to our needs. This helped us a lot. When working with
the same codebase day by day for years you don't want to waste time with
searching for files. A good one should feel like home, where you know
exactly where to find your stuff. It should be also easy to explain it
to others where they can find stuff so that they don't have to open all
cupboards when you are on vacations.

AngularJS provides modules. The module is the starting point for your
file structure. We defined as a rule of thumb that as soon as a functionality
needs its own routes or has CRUD operations it should be moved into a module.
I would definitely not recommend to define all routes in one routes file!
Each module has its own components, models, services, etc.
A component consist of multiple files. At least the TypeScript file that
defines the component and a template. Other files that will also need are
a test file, a style file and a internationalisation file. Because of 
so many files it makes also sense to put all those files into a component folder.

John Papa also recommends to put components,services,models,... that are used
by other modules into a shared folder. 
I'm not so sure if this is a good idea because everything in your module could
sooner or later become to a shared thing. I don't want to move the files
from x into shared only because it became shared.

So in this step i'm moving all the files into a modular file structure.
To see the result you can checkout the branch 2-file-structure
```
git checkout tags/2-file-structure
```
## Step 2—Preparation to support BackboneJS
In this step i'm preparing the application to support BackboneJS.
Wait what, why BackboneJS?!

You may asking why adding another dependency to your project.
So far we created HeroService with the typical CRUD operations. 
But when you add more modules with CRUD operations to your application 
you you will find yourself copying the same boilerplate code from service to service:
```


@Injectable()
export class HeroService {
    private heroesUrl = 'app/heroes';

    private headers = new Headers({'Content-Type': 'application/json'});

    private handleError(error: any): Promise<any> { ... }

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]> { ... }

    getHero(id: number): Promise<Hero> { ... }

    update(hero: Hero): Promise<Hero> { ... }

    create(name: string): Promise<Hero> { ... }

    delete(id: number): Promise<void> { ... }
}
```
As soon as you start repetitiously copy boilerplate code something is 
rotten in your application architecture.

The solution for this boilerplate code is to use the model and collection
provided by BackboneJS.

We already have defined our Hero model:
```
export class Hero {
    id: number;
    name: string;
}
```
Why not giving that model more functionality so it can create, read, update
and destroy data by itself? With the Model of BackboneJs we can exactly do
that.

But before we can do that we have to couple BackboneJS with AngularJS. We have to
overwrite the `Backbone.ajax` with the `Request` provided by AngularJS.
I'm creating a new module called `Backbone` where we are configuring it
in the module constructor.
To see the result you can checkout the branch 3-backbone-config
```
git checkout tags/3-backbone-config
npm install
```
## Step 3—Replace hero data services with BackboneJS
In the backbone module we have created a base model and a base collection
that extend from the BackboneJS model and collection. 

They should provide the base functionality and all other models and collections 
should extend from them.
For example we defined a default parse method that is called by
BackboneJS automatically after a successful fetch.

The collection got also the functionality that it has queryParams that
are  passed as options into the fetch method. We need this for
the search functionality of our search component.

We extend our hero model with the baseModel from the backbone module.
After we have defined a urlRoot, it is ready to make requests to our api.

We are also moving the validation logic that was put in the hero index
component before into the validate function of the model
```
add(name: string): void {
  name = name.trim();
  if (!name) { return; }`
  ...
}
```
Validation logic should never be put into a controller but rather into
the model. Therefore, BackboneJS provides a validation function that is 
called before the model is created. When it returns false it will not 
make a request. We overwrite the default BackboneJS validation method, 
that is doing nothing by default with our own validation logic.

After that we define our heroes collection that will hold multiple hero models.
By putting the annotation `@Injectable()` over the class export we can use
the model and collection like a normal AngularJS service and are able to 
inject it into our components.

Now we are going through each component and replace the hero service with
the BackboneJS one.
When we have finished we can remove the services of the heroes module.

Another benefit you will get by using BackboneJS the data logic is extracted 
from any angular logic. 

A new layer is born—the data layer. 

AngularJS is still responsible for all the ui logic but the data will be 
provided by the BackboneJS powered data layer. 

You can rip out this data layer from your AngularJS application and 
use it for any other applications as well. 
The data layer can be seen as a small JavaScript SDK for your API. 

More information to that topic can be found in this 
[blogpost](http://blog.mwaysolutions.com/2015/05/07/backbonejs-meets-angularjs/)

To see the result you can checkout the branch 4-backbone-refactoring
```
git checkout tags/4-backbone-refactoring
```
 