declare const process: {
	env: {
		argv: string[];
	};
};

/**
 * Dead simple CLI argument parser
 *
 * @param argv - The CLI arguments
 * @returns Parsed flags and arguments
 *
 * @example
 * ```ts
 * const [flags, args] = parse(['--foo', 'bar', 'baz', '-p=123', "--no-verify"]);
 * console.log(flags); // { foo: 'bar', p: '123', "no-verify": true }
 * console.log(args); // ['baz']
 * ```
 */
export function parse(
	argv: string[] = process.env.argv.slice(2),
): [flags: Record<string, string | boolean>, args: string[]] {
	const flags: Record<string, string | boolean> = {};
	const args: string[] = [];

	for (let i = 0; i < argv.length; i++) {
		const arg = argv[i];

		if (arg.startsWith('-')) {
			const isLongFlag = arg.startsWith('--');
			const sliceIndex = isLongFlag ? 2 : 1;
			const [key, value] = arg.slice(sliceIndex).split('=');

			if (!key) {
				// Ignore '-' or '--' without a key
				continue;
			}

			if (value !== undefined) {
				// Handle case like --key=value or -k=value
				flags[key] = value;
			} else {
				// Handle case like --key value or -k value or --boolean-flag or -b
				const nextArg = argv[i + 1];
				if (nextArg && !nextArg.startsWith('-')) {
					// Next arg exists and is not a flag, treat it as value
					flags[key] = nextArg;
					i++; // Consume the next argument as it's the value
				} else {
					// No value provided (or next arg is another flag), treat as boolean
					flags[key] = true;
				}
			}
		} else {
			// Not a flag, treat as positional argument
			args.push(arg);
		}
	}

	return [flags, args] as const;
}
