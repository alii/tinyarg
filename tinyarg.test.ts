import {describe, expect, it} from 'bun:test';
import {parse} from './src/index';

describe('parse', () => {
	it('should parse long flags', () => {
		const [flags, args] = parse(['--foo', 'bar']);
		expect(flags).toEqual({foo: 'bar'});
		expect(args).toEqual([]);
	});

	it('should parse long flags with values', () => {
		const [flags, args] = parse(['--foo=bar']);
		expect(flags).toEqual({foo: 'bar'});
		expect(args).toEqual([]);
	});

	it('should parse boolean long flags', () => {
		const [flags, args] = parse(['--foo']);
		expect(flags).toEqual({foo: true});
		expect(args).toEqual([]);
	});

	it('should parse short flags', () => {
		const [flags, args] = parse(['-f', 'bar']);
		expect(flags).toEqual({f: 'bar'});
		expect(args).toEqual([]);
	});

	it('should parse short flags with values', () => {
		const [flags, args] = parse(['-f=bar']);
		expect(flags).toEqual({f: 'bar'});
		expect(args).toEqual([]);
	});

	it('should parse boolean short flags', () => {
		const [flags, args] = parse(['-f']);
		expect(flags).toEqual({f: true});
		expect(args).toEqual([]);
	});

	it('should parse positional arguments', () => {
		const [flags, args] = parse(['foo', 'bar']);
		expect(flags).toEqual({});
		expect(args).toEqual(['foo', 'bar']);
	});

	it('should parse mixed flags and arguments', () => {
		const [flags, args] = parse(['--foo', 'bar', 'baz', '-p=123', '--no-verify']);
		expect(flags).toEqual({'foo': 'bar', 'p': '123', 'no-verify': true});
		expect(args).toEqual(['baz']);
	});

	it('should handle empty input', () => {
		const [flags, args] = parse([]);
		expect(flags).toEqual({});
		expect(args).toEqual([]);
	});

	it('should ignore invalid flags', () => {
		const [flags, args] = parse(['--=', '-=', 'foo']);
		expect(flags).toEqual({});
		expect(args).toEqual(['foo']);
	});
});
