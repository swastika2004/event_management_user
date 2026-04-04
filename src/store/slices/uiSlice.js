import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarOpen: false,
  mobileMenuOpen: false,
  notification: null, // { type, message }
  modal: null, // { type, data }
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen
    },
    setSidebarOpen(state, action) {
      state.sidebarOpen = action.payload
    },
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
    setMobileMenuOpen(state, action) {
      state.mobileMenuOpen = action.payload
    },
    showNotification(state, action) {
      state.notification = action.payload
    },
    clearNotification(state) {
      state.notification = null
    },
    openModal(state, action) {
      state.modal = action.payload
    },
    closeModal(state) {
      state.modal = null
    },
  },
})

export const {
  toggleSidebar, setSidebarOpen,
  toggleMobileMenu, setMobileMenuOpen,
  showNotification, clearNotification,
  openModal, closeModal,
} = uiSlice.actions

export default uiSlice.reducer
