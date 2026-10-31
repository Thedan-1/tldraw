import { cleanupText, hasPreservedWhitespaceInHtml } from '../text/text'

describe(cleanupText, () => {
	it('can handle the empty string', () => {
		expect(cleanupText('')).toBe('')
	})
	it('can handle space-only strings', () => {
		expect(cleanupText(' ')).toBe('')
		expect(cleanupText('   ')).toBe('')
	})
})

describe(hasPreservedWhitespaceInHtml, () => {
	const document = globalThis.document

	it('recognizes preformatted elements', () => {
		expect(hasPreservedWhitespaceInHtml('<pre>line one\nline two</pre>', document)).toBe(true)
	})

	it('recognizes inline white-space styles', () => {
		expect(
			hasPreservedWhitespaceInHtml(
				'<div style="white-space: pre-wrap">line one\nline two</div>',
				document
			)
		).toBe(true)
	})

	it('recognizes white-space rules in copied style elements', () => {
		expect(
			hasPreservedWhitespaceInHtml(
				'<style>.poem { white-space: pre-line }</style><div class="poem">line one\nline two</div>',
				document
			)
		).toBe(true)
	})

	it('does not classify ordinary HTML as preformatted', () => {
		expect(hasPreservedWhitespaceInHtml('<div>line one\nline two</div>', document)).toBe(false)
	})
})
