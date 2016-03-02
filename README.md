
# Angular Lite

Angular Lite - lightweight Angular implementation inspired by [Minko Gechev](http://blog.mgechev.com/2015/03/09/build-learn-your-own-light-lightweight-angularjs)

## Features:
 - [x] Scope
   - [ ] Isolated scope
   - [ ] [Scope life-cycle](https://docs.angularjs.org/guide/scope)
   - [ ] Watch collection
 - [x] Templates
   - [ ] Support for expressions {{}}
 - [ ] Filters
   - [ ]
 - [x] Directives
   - [x] Property binding using *ng-prop.inner-text*
   - [x] Attribute binding using *ng-attr.aria-role*
   - [x] Templates
   - [ ] Transclusion [How transclusion works in Angular](http://teropa.info/blog/2015/06/09/transclusion.html), [Transclusion](https://docs.angularjs.org/api/ng/service/$compile#transclusion)
   - [ ] "require" property to inject some parent directive/components
   - [ ] ng-if directive
   - [ ] ng-repeat directive. [How ng-repeat works](https://code.angularjs.org/1.4.9/docs/guide/compiler)
   - [ ]
 - [ ] Components as custom elements
   - [ ]
 - [x] Controller directive
   - [ ] "controller as" feature
   - [ ]
 - [x] Dependency injection
   - [ ] Results caching
   - [ ] Support for providers in DI. Provider - is a way to customize resolving of some dependencies(for example $element, or parent components etc.)
   - [ ]
 - [ ] Add some examples
 - [ ]

## Lessons learned:
 - [Indirect call of constructor function with array of parameters](http://stackoverflow.com/a/8843181)
 -

## Resources used:
 - [How data binding work](http://stackoverflow.com/questions/9682092/how-does-data-binding-work-in-angularjs/9693933#9693933)
 - [Angular scope](https://docs.angularjs.org/guide/scope)
 - [Digest cycle in SPA](http://blog.bguiz.com/post/60397801810/digest-cycles-in-single-page-apps/)
 - Angular internals
   - [Angular internals in depth](https://www.smashingmagazine.com/2015/01/angularjs-internals-in-depth/)
   - [Angular internals in depth 2](https://www.smashingmagazine.com/2015/11/angularjs-internals-in-depth-part-2/)
   - [Angular internals slides](http://cvuorinen.github.io/angularjs-internals-slides/#/)
   - [Make your own angular - scopes and digest](http://teropa.info/blog/2013/11/03/make-your-own-angular-part-1-scopes-and-digest.html)
   - [How transclusion works](http://teropa.info/blog/2015/06/09/transclusion.html)
 - [NodeList and Array](https://toddmotto.com/a-comprehensive-dive-into-nodelists-arrays-converting-nodelists-and-understanding-the-dom/)
 - [For-in loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in)
 - Angular2 and Aurelia
   - [Porting an Angular 2.0 App to Aurelia](http://eisenbergeffect.bluespire.com/porting-an-angular-2-0-app-to-aurelia/)

Scope:
http://stackoverflow.com/questions/27485848/why-cant-multiple-directives-ask-for-an-isolated-scope-on-the-same-element
