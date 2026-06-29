import { defineStore } from 'pinia'

let nextMemberId = 3

/**
 * useMembersStore
 * Bonus — Library Management System
 * Tracks registered library members.
 */
export const useMembersStore = defineStore('members', {
  state: () => ({
    members: [
      { id: 1, name: 'Alex Chen', email: 'alex.chen@example.com' },
      { id: 2, name: 'Maria Gomez', email: 'maria.gomez@example.com' },
    ],
  }),

  getters: {
    memberCount: (state) => state.members.length,
  },

  actions: {
    addMember({ name, email }) {
      this.members.push({ id: nextMemberId++, name, email })
    },
    removeMember(memberId) {
      this.members = this.members.filter((m) => m.id !== memberId)
    },
    updateMember(memberId, changes) {
      const member = this.members.find((m) => m.id === memberId)
      if (member) Object.assign(member, changes)
    },
  },
})
