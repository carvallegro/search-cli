# Search CLI

## Overview

Using the provided data (tickets.json and users.json and organization.json) write a simple command line application to search the data and return the results in a human readable format.

Feel free to use libraries or roll your own code as you see fit. Where the data exists, values from any related entities should be included in the results. The user should be able to search on any field, full value matching is fine (e.g. “mar” won’t return “mary”). The user should also be able to search for empty values, e.g. where description is empty.

## Keep in mind

Search can get pretty complicated pretty easily, we just want to see that you can code a basic search application.

## Evaluation Criteria

We will look at your project and assess it for:

- Extensibility - separation of concerns.
- Simplicity - aim for the simplest solution that gets the job done whilst remaining readable, extensible and testable
- Test Coverage - breaking changes should break your tests.
- Performance - should gracefully handle a significant increase in amount of data provided (e.g 10000+ users).
- Robustness - should handle and report errors.

## Specifications

- Use the language in which you are strongest.
- Include a README with (accurate) usage instructions.
- Consider using the README to explain the approach you took with the challenge.  Understanding any methodologies, or design patterns you used, or just how you thought about the problem, can be very helpful for assessors.
