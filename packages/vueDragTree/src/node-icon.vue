<script>
export default {
  name: 'NodeIcon',
  props: {
    node: {
      type: Object,
      required: true
    }
  },
  mounted () {
  },
  methods: {
    handleExpandIconClick() {
      if (this.node.isLeaf) return
      if (this.node.expanded) {
        this.$emit('node-collapse', this.node.data, this.node, this)
        this.node.collapse()
      } else {
        this.node.expand()
        this.$emit('node-expand', this.node.data, this.node, this)
      }
    }
  },
  render(h) {
    const parent = this.$parent
    const tree = parent.tree
    const node = this.node
    const { data } = node
    return (
      tree.$scopedSlots['node-icon']
        ? h('div', {
          class: 'org-tree-node-icon',
          on: {
            click: () => this.handleExpandIconClick()
          }
        },
        [
          tree.$scopedSlots['node-icon']({ node, data })
        ])
        : h('span', {
          class: ['org-tree-node-btn', { 'is-leaf': node.isLeaf, expanded: !node.isLeaf && node.expanded }],
          on: {
            click: () => this.handleExpandIconClick()
          }
        }
        )
    )
  }
}
</script>
