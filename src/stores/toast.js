import { reactive } from 'vue'

const state = reactive({ toasts: [] })
let nextId = 0

export function useToast() {
  function show(message, type = 'success', duration = 3500) {
    const id = ++nextId
    state.toasts.push({ id, message, type })
    setTimeout(() => remove(id), duration)
  }

  function remove(id) {
    const idx = state.toasts.findIndex(t => t.id === id)
    if (idx !== -1) state.toasts.splice(idx, 1)
  }

  function success(msg) { show(msg, 'success') }
  function error(msg) { show(msg, 'error') }
  function info(msg) { show(msg, 'info') }

  return { state, show, remove, success, error, info }
}
