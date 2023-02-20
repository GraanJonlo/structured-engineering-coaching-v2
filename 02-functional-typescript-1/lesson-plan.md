# 02 - Functional TypeScript 1

## Topic

Applying functional programming to TypeScript. Types, immutability, information hiding and functional composition.

## Objectives

By the end of this lesson, the student will be able to:
- differentiate between record types, union types and function types
- explain the advantages of immutability and information hiding
- explain the concept of combining functions

## Materials

- VS Code or other IDE
- Initial TypeScript
- Target TypeScript

## Lesson activities

### Introduction (5 minutes)

- Recap functional principles
- Introduce the initial TypeScript code
- Explain the lesson objective

### Record types (10 mins)

- Explain record types and introduce the `Account` record
- Introduce typing function parameters and how it provides intellisense and type safety
- Discuss inferred and explicit response type

### Union types (15 mins)

- Explain union types and introduce the `Account` `Current` / `Savings` union
- Introduce constructor function, read only properties and discuss advantages
- Discuss returning union type instead of record types
- Discuss abstraction and information hiding
- Discuss the "Pit of Success"

### Function types (5 mins)

- Explain function types and their usefulness in software design and comprehension
- Discuss typed arrow functions

### Namespaces (10 mins)

- Explain namespaces and introduce the `Account` namespace
- Discuss how namespaces provide information hiding
- Demonstrate how all types relating to accounts can be moved inside the namespace to prevent incorrect creation

### Function composing (10 mins)

- Explain how we can use a factory to break dependencies
- Explain generics through the fruit example
- Demonstrate generifying the factory into the Compose type

### Conclusion (5 mins)

- Recap each of the types
- Discuss how immutability and information hiding avoid common bugs and make code easier to reason about
- Discuss how function composing is an option when it makes code more habitable

## Assessment

Have the student provide a summary of each type, the advantages of immutability and information hiding, and function composing.
