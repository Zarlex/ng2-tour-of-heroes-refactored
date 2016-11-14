# ng2-tour-of-heroes-refactored
I started learning AngularJS three years ago when i started as a frontend developer
for the product [Relution](http://relution.io). When i started, the product was relatively new
and i could enter almost uncharted waters. The codebase of the application was 
obviously growing over time and soon we had to deal with decisions that we took in early stages.
As it is a product we could not start from scratch but we had to refactor our codebase to
keep it scalable for the future. Some of the refactorings had a bigger impact and could not be
done in a day. As there was the request for new features some of the refactorings had to be done
in parallel. This was sometimes a hard task to do so.

Anyway, as Google decided to develop the version AngularJS 2 that to not make it backwards compatible to 
Angular 1, i had to face the truth that i have to start from the beginning (again).
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
I don't that it is a good idea to have all the files in one folder.
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