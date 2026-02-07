<template>
    <div>
      <div id="editor">
          <div class="editor-wrapper">
              <Toolbar
                  class="editor-toolbar"
                  :editor="editorRef"
                  :mode="mode"
              />
              <Editor
                  style="height: auto; overflow-y: hidden;"
                  :modelValue="modelValue"
                  :defaultConfig="editorConfig"
                  :mode="mode"
                  @onCreated="handleCreated"
                  @onChange="handleChange"
              />
          </div>
      </div>
    </div>
  </template>
  
  <script>
  import '@wangeditor/editor/dist/css/style.css'
  import { onBeforeUnmount, shallowRef, watch } from 'vue'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  
  export default {
    name: 'wangeditor',
    components: { Editor, Toolbar },
    props: {
      modelValue: {
        type: String,
        default: ''
      }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const editorRef = shallowRef()
      const mode = 'default'
      // 默认显示的内容
      // const defaultHtml = '<p>请输入内容...</p>'
      
      const editorConfig = { 
        MENU_CONF: {
          uploadImage: {
            headers: {},
            server: process.env.VUE_APP_BASE_API + "/public/fileupload/4564",
            fieldName: 'file',
          }
        }
      }
  
      const handleCreated = (editor) => {
        editorRef.value = editor
        // // 初始化设置编辑器内容
        editor.setHtml(props.modelValue)
        // 如果没有传入 modelValue，则显示默认内容
        // if (!props.modelValue) {
        //         editor.setHtml(defaultHtml)
        // }
      }
  
      // 监听内容变化
      const handleChange = (editor) => {
        const html = editor.getHtml()
        emit('update:modelValue', html)
      }
  
      // 监听外部传入的modelValue变化
      watch(() => props.modelValue, (newVal) => {
        if (editorRef.value && newVal !== editorRef.value.getHtml()) {
          editorRef.value.setHtml(newVal)
        }
      })
  
      onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
      })
  
      return {
        editorRef,
        mode,
        editorConfig,
        handleCreated,
        handleChange
      }
    }
  }
  </script>

  <style scoped lang="less">
  .editor-wrapper {
    border: 1px solid var(--app-border-color);
    z-index: 100;
    border-radius: 4px;
    overflow: hidden;
    
    /* wangEditor Global Variable Overrides */
    --w-e-toolbar-bg-color: var(--header-bg-color);
    --w-e-toolbar-color: var(--app-text-color-primary);
    --w-e-toolbar-active-bg-color: var(--item-hover-bg-color);
    --w-e-toolbar-active-color: var(--primary-200);
    --w-e-toolbar-border-color: var(--app-border-color);
    
    --w-e-editor-bg-color: var(--app-content-bg-color);
    --w-e-editor-color: var(--app-text-color-primary);
    
    --w-e-textarea-bg-color: var(--app-content-bg-color);
    --w-e-textarea-color: var(--app-text-color-primary);
    --w-e-textarea-border-color: var(--app-border-color);
    
    --w-e-modal-button-bg-color: var(--item-hover-bg-color);
    --w-e-modal-button-border-color: var(--app-border-color);
  }
  
  .editor-toolbar {
    border-bottom: 1px solid var(--app-border-color) !important;
  }

  /* Deep selectors for components that might not pick up variables correctly */
  :deep(.w-e-text-container) {
    background-color: var(--app-content-bg-color) !important;
    color: var(--app-text-color-primary) !important;
  }

  :deep(.w-e-toolbar) {
    background-color: var(--header-bg-color) !important;
    color: var(--app-text-color-primary) !important;
  }
  </style>