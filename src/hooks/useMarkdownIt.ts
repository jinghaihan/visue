import MarkdownIt from 'markdown-it'

export function useMarkdownIt() {
  const markdown = new MarkdownIt({})

  return { markdown }
}
