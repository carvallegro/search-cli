# CLI Search [![Build Status](https://travis-ci.com/carvallegro/toy-robot-java.svg?branch=master)](https://travis-ci.com/carvallegro/toy-robot-java) [![codecov](https://codecov.io/gh/carvallegro/search-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/carvallegro/search-cli) [![CodeFactor](https://www.codefactor.io/repository/github/carvallegro/search-cli/badge)](https://www.codefactor.io/repository/github/carvallegro/search-cli)
> See [Instructions](./INSTRUCTIONS.md)



## Install and run

## Usage

### Search

### Get keys

### Help

## Technical decisions

### Architecture

The application is structured in 4 main layers: input, processing, search (with 1 sub-layer for the core search features) and print.

```
index.js                    process+cli.js
+----------------------+    +--------------------------------+
| INPUT                |    |PROCESS                         |
|                      +--->+                                |
| Entry point through  |    |Links multiple layers together. |
| commander.js         |  +-+Better separation of concern.   |
+----------------------+  | +---+----------------------------+
                          |     |
                          |     |
                          |     v
print.js                  |  search/index.js         search/core.js
+----------------------+  |  +------------------+    +------------------+
|PRINT                 |  |  |SEARCH            |    |CORE SEARCH       |
|                      +<-+  |                  +--->+                  |
|Print the result in a |     |Search through    |    |Simple interface  |
|pretty format.        +---->+appropriate data. |    |with Fuse.js      |
+----------------------+     +------------------+    +------------------+
```

The print layer may call the search layer to enrich its table with cross domain informations (eg: get a organization name).

#### Input

Commander is a simple library that I used to abstract the CLI input. It easily allows the definition of options and specific commands for a Node application.

It's a very simple interface with no search logic. The only logic implemented is the one intrinsic to the CLI and commander (validity of command inputed, options, help...).

#### Process

The process search is where the magic happens. It contains most of the "business logic" of the application. It simply hooks together the input, the search and the print layers.

It's relatively permissive and will graciously default to default values or empty arrays/objects.

#### Search

The search is split into two parts: the core search (in `search/core.js` ) and the abstracted search (in `search/index.js`).

The core search uses [Fuse.js](http://fusejs.io/), a very performant, light-weight, search library. it offers a lot of configuration and fine tuning but for the purpose of this exercise I've only used it to get the ids of the results with a strict threshold.

The abstracted search gives more context as of how and what we can search on. it provides 3 search interfaces, one for each domains (user, organization and ticket). As the process layer, the functions are rather permissive.

I did not allow a search over every keys of the given data as not everything is relevant or would be open in a prod environment. Only keys that make sense are allowed to search on.

#### Print

The print layer uses [chalk](https://github.com/chalk/chalk) and [columnify](https://github.com/timoxley/columnify) to print a nice output of the given search. I tried to highlights the results in a way that it will be easy to pick up the data. I guess I could have make it a bit more modular but I didn't really see the need in this bit of the project. Printing on console is fairly brainless and I allowed some level of duplication, creating method where really appropriate.

### Precisions

#### Dates

I've noticed that most dates are localized but I couldn't find a good way to display them in such a context (terminal with limited space).

#### Binaries

There are no binaries asnd no way of generating them for this application. It could have been done but I felt like it was over coreering the exercise.

The code needs to be run using NPM or Yarn.

#### (Pure?) Functional programming

This exercise allowed me to try out [Pure Functional programming](https://github.com/MostlyAdequate/mostly-adequate-guide) but, being a concept I'm not familiar with, it impacted my velocity. I decided to only use it in the search code files. It was a good exercise and allowed me to play around. I know I could have done thing differently (a bit closer to the Pure functional theory) but I couldn't figure out how and did not want to spend too much time on it. The interface with the rest of the code is not pure functional as it have more than one parameter.

The rest of the codebase is mainly functional, I was a bit more pragmatic in my use of it and ended with a mix of both, which, in my opinion, is a good compromise between readibility, maintenability, testability, modularity, etc.

My final notes on Pure Functional is that, when mastered at a professional proficiency, it offers a lot of things:

- No duplications
- Test once
- Basically Lego™️ coding

However you pay those with a steep learning curve due to the complexity of this advanced concept which means that it's not easily readable for someone not familiar with Pure Functional and when onboarding a new dev, there will need to be intense training to be done.

Another caveats is, while you only need to test your functions once, when composing a new function it is a bit harder to efficiently calculate coverage. It also means that you can focus on only the business values of your tests. But if a developer is not rigorous in their tests, the risk is greater because it becomes harder to control.

#### Tests

The tests are run using Mocha, Chai and Sinon using the BDD interface of Chai. I haven't set any hard treshold of test coverage but I'm fairly happy with where it's at currently.

I could have mocked the data when testing the search and I'd have done so it the data was to be stored in a database or accessed through REST services instead of being in files. But given the current case, I felt like I could gain time.

#### CI/CD

This repository is hooked to Travis CI, Codecov and Codefactor. It gives me automation and peace of mind when creating PR: I have a set of tool that will run tests, analyse the coverage and analyse the code for big inconsistencies in quality.

Given more time or a professional project I'd have run pre-commit hooks to run lint checks and unit tests and could have also used Travis to build binaries and publish them online. Coupled with Commitizen it would also have implementated automatic versionning.

## Dependencies

### Search libraries

- 🎉 [fusejs](https://github.com/krisk/fuse/): Selected this search library over the other mainly because it has the most stars on Github, which is kind of an indicator of quality but also means more support from the community.


### CLI utilities

- [commander](https://github.com/tj/commander.js): command-line interfaces made easy
- [chalk](https://github.com/chalk/chalk): Colorful console outputs.
- [columnify](https://github.com/timoxley/columnify): Provide a nice output with aligned columns
- [ora](https://github.com/sindresorhus/ora): Wait in style. TODO: use or remove
- [string-width](https://github.com/sindresorhus/string-width) TODO: remove
- [conf](https://github.com/sindresorhus/conf): TODO: use or remove.


### General libraries

- [Lodash](https://lodash.com/docs/4.17.11): because Lodash.
- [moment](https://momentjs.com): For a better time display.

### Potential dependencies

- https://github.com/matiassingers/emoji-flags
- https://github.com/f/omelette
- https://github.com/isaacs/node-jake
