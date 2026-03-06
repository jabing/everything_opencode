# Model Route Command

Configure model routing for different task types.

## Usage

/model-route                # Show current routing
/model-route <task> <model> # Set route for task type
/model-route --reset        # Reset to defaults

## Task Types

- default: Default model for general tasks
- coding: Model for code generation
- review: Model for code review
- planning: Model for planning tasks

## Examples

/model-route coding sonnet
/model-route review haiku
/model-route --reset
