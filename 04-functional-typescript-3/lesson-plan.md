# 04 - Functional TypeScript 3

## Topic

Applying functional programming to TypeScript. Result and bind.

## Objectives

By the end of this lesson, the student will be able to:

- Explain how tagged unions and elevated types can lead to simpler code

## Materials

- VS Code or other IDE
- Initial TypeScript
- Target TypeScript

## Lesson activities

### Introduction (10 minutes)

- Recap higher order functions and functions that create/ adapt functions
- Recap compose
- Introduce intial TypeScript code
- Explain the lesson objective

### Validation (10 mins)

- Discuss approaches to validation such as
  - throwing errors/ exceptions
  - returning tuples
  - callback functions
- Discuss the limitations of each approach

### Result (10 minutes)

- Discuss the idea of elevating the type being elevated to carry additional ok/ not ok information and introduce the Result tagged union
- Demonstrate that like Option, Result is an elevated type and as such both `map` and `apply` can be written for it
- Introduce the validation helpers that now return Result

### Bind (10 minutes)

- Show that the new validation helpers cannot be composed together
- Explain how `map` isn't an option in this scenario as it transforms the output of a function but our validation helpers already emit Result
- Show that with a small variation of `map` we can create the `bind` function

### Reduce and bind all (10 minutes)

- Demonstrate how the individual validators can now be composed into `panValidator`
- Introduce `Array.reduce` and dicuss how we could use it in this instance to deal with the nested compose
- Demonstrate the creation of the `bindAll` helper function
- Show that to create panValidator we now only need to pass a list of validators to `bindAll`

### Conclusion (5 minutes)

- Recap
  - Composition
  - Tagged unions
  - The elevated types abstraction
- Discuss how they enable us to write simpler code

## Assessment

- Have the student provide a summary of functional programming in TypeScript
