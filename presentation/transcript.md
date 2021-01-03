### Slide 1
Hello, everyone.<br>
My name is Alexandr and with this video I'd like to present you my talk about Typescript.<br>

### Slide 2
What is TypeScript?
By definition, “TypeScript is JavaScript for application-scale development.”
TypeScript is a strongly typed, object oriented, compiled language. It was designed by Anders Hejlsberg (designer of C#) at Microsoft. TypeScript is both a language and a set of tools. TypeScript is a typed superset of JavaScript compiled to JavaScript. In other words, TypeScript is JavaScript plus some additional features.

### Slide 3
Features of TypeScript
TypeScript is just JavaScript. TypeScript starts with JavaScript and ends with JavaScript. Typescript adopts the basic building blocks of your program from JavaScript. Hence, you only need to know JavaScript to use TypeScript. All TypeScript code is converted into its JavaScript equivalent for the purpose of execution.
TypeScript supports other JS libraries. Compiled TypeScript can be consumed from any JavaScript code. TypeScript-generated JavaScript can reuse all of the existing JavaScript frameworks, tools, and libraries.
JavaScript is TypeScript. This means that any valid .js file can be renamed to .ts and compiled with other TypeScript files.
TypeScript is portable. TypeScript is portable across browsers, devices, and operating systems. It can run on any environment that JavaScript runs on. Unlike its counterparts, TypeScript doesn’t need a dedicated VM or a specific runtime environment to execute.

### Slide 4
TypeScript and ECMAScript
The ECMAScript specification is a standardized specification of a scripting language. There are six editions of ECMA-262 published. Version 6 of the standard is codenamed "Harmony". TypeScript is aligned with the ECMAScript6 specification.
TypeScript adopts its basic language features from the ECMAScript5 specification, i.e., the official specification for JavaScript. TypeScript language features like Modules and class-based orientation are in line with the EcmaScript 6 specification. Additionally, TypeScript also embraces features like generics and type annotations that aren’t a part of the EcmaScript6 specification.

### Slide 5
Why Use TypeScript?
TypeScript is superior to its other counterparts like CoffeeScript and Dart programming languages in a way that TypeScript is extended JavaScript. In contrast, languages like Dart, CoffeeScript are new languages in themselves and require language-specific execution environment.
The benefits of TypeScript include −
•	Compilation − JavaScript is an interpreted language. Hence, it needs to be run to test that it is valid. It means you write all the codes just to find no output, in case there is an error. Hence, you have to spend hours trying to find bugs in the code. The TypeScript transpiler provides the error-checking feature. TypeScript will compile the code and generate compilation errors, if it finds some sort of syntax errors. This helps to highlight errors before the script is run.
•	Strong Static Typing − JavaScript is not strongly typed. TypeScript comes with an optional static typing and type inference system through the TLS (TypeScript Language Service). The type of a variable, declared with no type, may be inferred by the TLS based on its value.
•	TypeScript supports type definitions for existing JavaScript libraries. TypeScript Definition file (with .d.ts extension) provides definition for external JavaScript libraries. Hence, TypeScript code can contain these libraries.
•	TypeScript supports Object Oriented Programming concepts like classes, interfaces, inheritance, etc.

### Slide 6
Components of TypeScript
At its heart, TypeScript has the following three components −
•	Language − It comprises of the syntax, keywords, and type annotations.
•	The TypeScript Compiler − The TypeScript compiler (tsc) converts the instructions written in TypeScript to its JavaScript equivalent.
•	The TypeScript Language Service − The "Language Service" exposes an additional layer around the core compiler pipeline that are editor-like applications. The language service supports the common set of a typical editor operations like statement completions, signature help, code formatting and outlining, colorization, etc.

### Slide 7
How to use TypeScript 

### Slide 8
Commonly used types 
Boolean 
A simple true/false value

### Slide 9
Number 
A number is a floating-point value. Hexadecimal, decimals, binary and octal literals are also supported.

### Slide 10
String 
A simple textual type.

### Slide 11
Array 
A simple array can be written a few different ways.

### Slide 12
Tuple 
An array with a fixed number of elements where you know the types of the values, but an element in the array doesn’t have to be the same type.

### Slide 13
Object 
Object, as the name says, is the type for objects or technically speaking Non-Primitive data types. There are two ways of typing objects:

### Slide 14
Any 
The types that will allow everything. It’s not necessarily recommended to use any because it defeats the purpose of typing but if you’re stuck or the content is dynamic you could consider using any.

### Slide 15
Undefined and Null 
These are self-explanatory a null and undefined type.

### Slide 16
Never 
The never type is the type of value that never occurs. For instance, a function that never returns anything doesn’t finish running at all for example when a function throws an error.

### Slide 17
Void 
A Void type means that there is no type. Mostly used in return types for functions that don’t explicitly return a value. The difference with never is that avoid function explicitly returns a value because it returns the undefined value. Never just never returns anything it doesn’t even return undefined.

### Slide 18
Typing variables 
Like in most above examples typing variables is the most common use case in TypeScript and it’s easy!

“Chaining” types to have more types for one variable is also possible.

### Slide 19
Typing functions / return types for functions 
Like we saw before we can actually type parameter and add return types inline. It’s also possible to specify everything with the help of an interface.

### Slide 20
Interfaces 
When you need to define more complex data structures, like objects, functions, or classes, you can use interfaces to do so. Basically it’s a “contract” in your application telling TypeScript what’s inside your data structure.

### Slide 21
extending interfaces 
To make your code/interfaces more re-usable and consistent you can also extend your interfaces when needed.

### Slide 22
Types 
Types are similar to interfaces and can be used to type more complex data structures.

### Slide 23
extending type 

### Slide 24
Interfaces vs types 
Type interfaces are similar but there are some differences:
•	If you declare an interface with the same name twice Typescript will merge them into one interface. Types don’t behave the same way.
•	interfaces can only be used for object types but a type can be used for primitive data objects like strings, booleans, numbers, etc. 
•	type aliases can use computed properties

### Slide 25
Generics 
To make your code reusable you can use generics. If you look at the code below. without Generics we would have to give the myUser a specific type and if we want to use this function with another type we would have to make a new function with a different type, but generics make your code is much more reusable!

generic interface

### Slide 26
There is much more to TypeScript than this presentation covers but it should give you a basic overview of what TypeScript is and how it can be used. I hope this presentation helped you understand TypeScript a little bit better!
Thank you for your attention.<br>
Good luck.
