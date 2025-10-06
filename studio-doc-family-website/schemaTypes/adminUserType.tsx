import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const adminUserType = defineType({
  name: 'adminUser',
  title: 'Admin User',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'password', // We will store the plain text password here temporarily
      title: 'New Password',
      type: 'string',
      description: 'Set or update the password here. It will be encrypted upon saving.',
    }),
    defineField({
      name: 'passwordHash', // The real, encrypted password is stored here
      title: 'Password Hash',
      type: 'string',
      hidden: true, // Hide this field from the UI
    }),
  ],
  preview: {
    select: {
      title: 'username',
    },
  },
})