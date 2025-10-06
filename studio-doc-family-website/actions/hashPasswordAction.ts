import { DocumentActionProps, useDocumentOperation } from 'sanity'
import bcrypt from 'bcryptjs'

export const hashPasswordAction = (props: DocumentActionProps) => {
  const { patch, publish } = useDocumentOperation(props.id, props.type)
  const { draft, published } = props

  return {
    label: 'Publish with Hashed Password',
    onHandle: async () => {
      const doc = draft || published

      // Check if the temporary 'password' field has a value
      if (doc && typeof doc.password === 'string' && doc.password) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(doc.password, salt)

        // Patch the document to:
        // 1. Set the real passwordHash field
        // 2. Unset the temporary password field
        patch.execute([
          { set: { passwordHash: hash } },
          { unset: ['password'] },
        ])
      }
      // Continue with the regular publish action
      publish.execute()
    },
    // Disable the action if the document is already published and there are no changes
    disabled: !draft,
  }
}