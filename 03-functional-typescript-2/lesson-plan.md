# 03 - Functional TypeScript 2

## Topic

Applying functional programming to TypeScript. Elevated types.

## Objectives

By the end of this lesson, the student will be able to:

- Explain the idea of elevated types and their properties

## Materials

- VS Code or other IDE
- Initial TypeScript
- Target TypeScript

## Lesson activities

### Introduction (5 minutes)

- Recap TypeScript syntax
- Recap tagged unions
- Introduce intial TypeScript code
- Explain the lesson objective

### Elevated types (10 minutes)

- Introduce the idea of elevated types and their various names such as augmented, wrapped and monadic types
- Differentiate from design patterns by explaining that this in an example of inherent properties rather than a design choice and therefore elevated types are an abstraction
- Give arrays as an example of an elevated type

### Lift (10 minutes)

- Demonstrate a number, and the square and cube functions that work on a number
- Demonstrate numbers elevated to an array and the equivalent elevated functions
- Demonstrate how to dedupe, generify and curry the elevated functions into the `lift` function
- Discuss relationship to various OO patterns such as adapter and factory

### LiftN (10 minutes)

- Demonstrate that equivalent functions exist for various numbers of parameters
- Discuss sensible strategies for when collection sizes differ
- Discuss alternative names for `lift` such as `map` and `Select`

### Apply (10 minutes)

- Demonstrate working with elevated functions
- Discuss alternative names for `apply` such as `flatMap` and `SelectMany`

### Option/ Maybe (10 minutes)

- Discuss null as a sometimes hidden return type and its problems
- Discuss exceptions/ errors as another problematic return type
- Demonstrate `Option` as a type that captures the extra information about whether something was returned or not
- Demonstrate using `lift` to elevate a function into the elevated world

### Conclusion (5 minutes)

- Recap the concept of elevated types and how equivalent functions for those types exist
- Recap the common functions for working with elevated types that have been covered, lift and apply

## Assessment

Have the student provide a summary of elevated types.
