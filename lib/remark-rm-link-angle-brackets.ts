import { Parent } from 'unist'
import { visit } from 'unist-util-visit'

export default function remarkRmLinkAngleBrackets() {
  return (tree: Parent) => {
    visit(tree, 'link', (node: Parent) => {
      console.log(node)
    })
  }
}
