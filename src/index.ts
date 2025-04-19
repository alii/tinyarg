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

	for (const arg of argv) {
		if (arg.startsWith('--')) {
			const [key, value] = arg.slice(2).split('=');
			if (!key) continue;
			flags[key] = value ?? true;
		} else if (arg.startsWith('-')) {
			const [key, value] = arg.slice(1).split('=');
			if (!key) continue;
			flags[key] = value ?? true;
		} else {
			args.push(arg);
		}
	}

	return [flags, args] as const;
}
