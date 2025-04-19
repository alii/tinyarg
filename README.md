# tinyarg

Dead simple CLI argument parser

## Installation

```bash
bun add tinyarg
```

## Usage

```js
import {parse} from 'tinyarg';

// Using default process.argv
const [flags, args] = parse();

// Or explicitly pass an argv array
const [flags, args] = parse(['--foo', 'bar', 'baz', '-p=123', '--no-verify']);

console.log(flags); // e.g. { foo: 'bar', p: '123', 'no-verify': true }
console.log(args); // e.g. ['baz']
```

## Examples

```bash
# Long flag with value
$ bun cli.js --foo=bar baz
# flags: { foo: 'bar' }, args: ['baz']

# Short flag with value
$ bun cli.js -p=123
# flags: { p: '123' }, args: []

# Boolean flag
$ bun cli.js --no-verify
# flags: { 'no-verify': true }, args: []

# Mixed flags and positional arguments
$ bun cli.js -x --long=val arg1 arg2
# flags: { x: true, long: 'val' }, args: ['arg1', 'arg2']
```

## API

### parse(argv?: string[]): [flags: Record<string, string | boolean>, args: string[]]

- **argv**: An array of arguments to parse. Defaults to `process.argv.slice(2)`.
- **Returns**: A tuple containing:
  - **flags**: An object mapping flag names to their values (string) or `true` for boolean flags.
  - **args**: An array of positional arguments.

## License

MIT
