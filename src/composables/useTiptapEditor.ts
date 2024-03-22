import { onMounted, onUnmounted, watch, type ModelRef } from 'vue'

import { useEditor } from '@tiptap/vue-3'

import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'

export function useTiptapEditor (contentModel: ModelRef<string, string>, editorProps: Parameters<typeof useEditor>[0] = {}) {
  const editor = useEditor({
    ...editorProps,

    content: contentModel.value,

    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write your post content here',
      }),
    ],

    onUpdate () {
      contentModel.value = editor.value?.getHTML() ?? ''
    },
  })

  onMounted(() => {
    editor.value?.commands.setContent(contentModel.value, false)
  })

  watch(contentModel, (value = '') => {
    const isSame = editor.value?.getHTML() === value

    if (isSame) {
      return
    }

    editor.value?.commands.setContent(value, false)
  })

  onUnmounted(() => {
    editor.value?.destroy()
  })

  function toggleHeading (level: 1 | 2 | 3 | 4 | 5 | 6) {
    editor.value?.chain().focus().toggleHeading({ level }).run()
  }

  function setParagraph () {
    editor.value?.chain().focus().setParagraph().run()
  }

  return {
    editor,
    contentModel,
    toggleHeading,
    setParagraph,
  }
}
