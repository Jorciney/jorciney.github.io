---
title: Angular webpack vs esbuild
date: 2023-11-18 15:17:27 +0100
categories: [builder,angular,tools]
tags: [esbuild,webpack,builders,javascript,angular,frontend]
---
[![Hits](https://hits.sh/jorciney.dev/posts/angular-webpack-vs-esbuild.svg)](https://hits.sh/jorciney.dev/posts/angular-webpack-vs-esbuild/)
# Angular webpack vs esbuild
## What is webpack?
Webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles.

1. **Popularity and Community Support**:
  - Webpack is highly popular in web development.
  - Boasts a large, active community with many plugins and loaders.

2. **Flexibility and Configurability**:
  - Highly configurable, handling a wide range of file types.
  - Ideal for complex bundling scenarios.

3. **Integration and Ecosystem**:
  - Integrates well with tools and frameworks like React, Angular, and Vue.js.

4. **Build Speed**:
  - Slower build times, especially noticeable in larger projects.

5. **Learning Curve**:
  - Steeper learning curve due to extensive configuration options.

## What is esbuild?
As they already say on their [website](https://esbuild.github.io/): esbuild is a fast, modern bundler written in Go. It is up to 100x faster than other bundlers.

1. **Performance**:
  - Known for high-speed performance, significantly faster than Webpack.
  - Written in Go with efficient algorithms.

2. **Simplicity and Ease of Use**:
  - Simple, straightforward setup with minimal configuration.

3. **Limited Flexibility**:
  - Less flexible compared to Webpack, suited for simpler builds.

4. **Growing Community and Ecosystem**:
  - Rapidly gaining popularity with a growing ecosystem.

5. **Use Case**:
  - Ideal for projects where speed is a priority and build complexity is low.

But is it so fast? Lets find out!

## Speed comparison between Webpack and esbuild

### **Start** time
First lets compare the time it takes to start the application. For this test, I'm using both applications with Nx. The application is a simple Angular created as shown [here](../how-to-start-an-standalone-app-with-nx).

| Angular app using **Webpack**                                                                                | Angular app using **esbuild**                                                                            |
|--------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| ![2023-11-18-ng-app-webpack-start-time.png](../../assets%2Fposts%2F2023-11-18-ng-app-webpack-start-time.png) | ![2023-11-18-ng-app-esbuild-start-time.png](../../assets/posts/2023-11-18-ng-app-esbuild-start-time.png) |
| Start time of 1.755 seconds                                                                                  | Start time of 1.249 seconds                                                                              |

### **Build** time

| Angular app using **Webpack**                                                                                  | Angular app using **esbuild**                                                                                  |
|----------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| ![2023-11-18-ng-app-webpack-build-time.png](../..%2Fassets%2Fposts%2F2023-11-18-ng-app-webpack-build-time.png) | ![2023-11-18-ng-app-esbuild-build-time.png](../..%2Fassets%2Fposts%2F2023-11-18-ng-app-esbuild-build-time.png) |
| Where the build time is 5.303 seconds                                                                          | With esbuild we could build our application in only 1.765 seconds                                              |


### The main difference in config
As you can see in the screenshot below the main difference between the two configs is the build executor.
Both use the [`@angular-devkit/build-angular`](https://www.npmjs.com/package/@angular-devkit/build-angular), but esbuilder uses the `application` builder, while webpack uses the `browser` builder
![2023-11-18-esbuild-vs-webpack-builder.png](../..%2Fassets%2Fposts%2F2023-11-18-esbuild-vs-webpack-builder.png)
![2023-11-18-esbuild-vs-webpack-config.png](../..%2Fassets%2Fposts%2F2023-11-18-esbuild-vs-webpack-config.png)
# Conclusion

As you can see from the images above, esbuild is a lot faster than webpack.
I believe the bigger the application, the bigger the difference will be.
I'm not saying that webpack is bad, but if you are looking for a faster alternative, esbuild is the way to go.
I'm sure looking forward to testing esbuild on a bigger application.
